// CostumePage.jsx
import React, { useState, useRef, useContext, useEffect } from "react";
import { Rnd } from "react-rnd";
import {
  Heart,
  ShoppingBag,
  Trash2,
  RotateCw,
  Save,
  RefreshCcw,
  ZoomIn,
  ZoomOut,
  Upload,
} from "lucide-react";
import html2canvas from "html2canvas";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import NavBar from "../NavBar/NavBar";

const CostumePage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [rndProps, setRndProps] = useState({
    x: 20,
    y: 20,
    width: 160,
    height: 200,
  });

  const designRef = useRef(null);
  const caseImgRef = useRef(null);
  const [previewWidth, setPreviewWidth] = useState(320);

  useEffect(() => {
    const onResize = () => {
      const w = Math.min(400, Math.max(280, window.innerWidth * 0.35));
      setPreviewWidth(w);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedImage(URL.createObjectURL(file));
    setRotation(0);
    setScale(1);
    setRndProps({ x: 20, y: 20, width: 160, height: 200 });
  };

  const handleDelete = () => {
    if (uploadedImage && uploadedImage.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(uploadedImage);
      } catch {}
    }
    setUploadedImage(null);
    setRotation(0);
    setScale(1);
  };

  const handleRotate = (deg = 15) => setRotation((r) => r + deg);
  const handleZoom = (delta) =>
    setScale((s) => Math.min(Math.max(s + delta, 0.4), 3));

  const handleReset = () => {
    setRotation(0);
    setScale(1);
    setRndProps({ x: 20, y: 20, width: 160, height: 200 });
  };

  const handleSave = async () => {
    try {
      const dataUrl = await generateDesignDataUrl({ quality: 1.0 });
      if (!dataUrl) return;
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "custom-case.png";
      link.click();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // ✅ تعديل مهم: اقتصاص مضبوط بنسبة 9:18 لحل مشكلة الطول الزائد
  const generateCroppedCanvas = async () => {
    if (!designRef.current) return null;

    try {
      const element = designRef.current;
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: null,
        scale: 1.8,
      });

      const aspect = 9 / 18; // النسبة الطبيعية للجراب (عرض إلى طول)
      const fullW = canvas.width;
      const fullH = canvas.height;
      const cropWidth = fullW * 0.78;
      const cropHeight = cropWidth / aspect;

      // توسيط الاقتصاص داخل الصورة
      const cropX = (fullW - cropWidth) / 2;
      const cropY = (fullH - cropHeight) / 2.05;

      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      const ctx = croppedCanvas.getContext("2d");

      ctx.drawImage(
        canvas,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      return croppedCanvas;
    } catch (error) {
      console.error("❌ Error generating cropped design image:", error);
      return null;
    }
  };

  const generateDesignDataUrl = async ({ quality = 0.95 } = {}) => {
    try {
      const croppedCanvas = await generateCroppedCanvas();
      if (!croppedCanvas) return null;
      return croppedCanvas.toDataURL("image/png", quality);
    } catch (e) {
      console.error("generateDesignDataUrl error:", e);
      return null;
    }
  };

  const generateDesignBlob = async ({ type = "image/png", quality = 0.9 } = {}) => {
    const croppedCanvas = await generateCroppedCanvas();
    if (!croppedCanvas) return null;

    return await new Promise((resolve) => {
      croppedCanvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        type,
        quality
      );
    });
  };

  const handleAddToCart = async () => {
    try {
      const blob = await generateDesignBlob();
      if (!blob) return;
      const objectUrl = URL.createObjectURL(blob);
      const product = {
        id: Date.now(),
        name: "Custom Case",
        price: 80,
        image: objectUrl,
      };
      addToCart(product);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const blob = await generateDesignBlob();
      if (!blob) return;
      const objectUrl = URL.createObjectURL(blob);
      const product = {
        id: Date.now(),
        name: "Custom Case",
        price: 80,
        image: objectUrl,
      };
      addToFavorites(product);
    } catch (err) {
      console.error("Add to favorites failed:", err);
    }
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    if (!designRef.current) return;
    const parentW = designRef.current.offsetWidth;
    const parentH = designRef.current.offsetHeight;
    const newW = Math.min(parseInt(ref.style.width, 10), parentW);
    const newH = Math.min(parseInt(ref.style.height, 10), parentH);
    const newX = Math.max(0, Math.min(position.x, parentW - newW));
    const newY = Math.max(0, Math.min(position.y, parentH - newH));
    setRndProps({ width: newW, height: newH, x: newX, y: newY });
  };

  const handleDragStop = (e, d) => {
    if (!designRef.current) return;
    const parentW = designRef.current.offsetWidth;
    const parentH = designRef.current.offsetHeight;
    const clampedX = Math.max(0, Math.min(d.x, parentW - rndProps.width));
    const clampedY = Math.max(0, Math.min(d.y, parentH - rndProps.height));
    setRndProps((p) => ({ ...p, x: clampedX, y: clampedY }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 mb-20">
      <NavBar />
      <div className="h-20"></div>

      <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
        <div className="flex gap-8">
          {/* Preview column */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-[520px]">
              <div className="mb-4 text-left">
                <h2 className="text-2xl font-semibold">Customize Your Case</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Upload design, move it inside the case, rotate & zoom. When ready add to cart or save.
                </p>
              </div>

              <div
                ref={designRef}
                className="relative mx-auto bg-white rounded-3xl overflow-hidden shadow-lg"
                style={{
                  width: previewWidth,
                  height: (previewWidth * 18) / 9,
                  borderRadius: 28,
                }}
              >
                <div className="absolute inset-0 p-4 rounded-2xl">
                  {uploadedImage ? (
                    <Rnd
                      bounds="parent"
                      size={{ width: rndProps.width, height: rndProps.height }}
                      position={{ x: rndProps.x, y: rndProps.y }}
                      onDragStop={handleDragStop}
                      onResizeStop={handleResizeStop}
                      minWidth={40}
                      minHeight={40}
                    >
                      <img
                        src={uploadedImage}
                        alt="uploaded"
                        className="w-full h-full object-cover rounded-sm"
                        style={{
                          transform: `rotate(${rotation}deg) scale(${scale})`,
                          transformOrigin: "center center",
                          pointerEvents: "none",
                        }}
                        draggable={false}
                      />
                    </Rnd>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                      <div className="text-center text-gray-400">
                        <p className="text-lg">No design yet</p>
                        <p className="text-xs mt-1">Upload an image to start</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* case overlay */}
                <img
                  ref={caseImgRef}
                  src="/caseee (1)22.png"
                  alt="case-overlay"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 10, objectFit: "contain" }}
                />
              </div>

              <div className="mt-6 flex gap-3 justify-center">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                >
                  <Save size={16} /> Save
                </button>

                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center gap-2 bg-[#56cfe1] text-white px-4 py-2 rounded-lg shadow hover:opacity-95"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>

                <button
                  onClick={handleAddToFavorites}
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow hover:opacity-95"
                >
                  <Heart size={16} /> Favourite
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-[240px] bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200">
                <Upload size={16} />
                <span className="text-sm">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              <button
                onClick={() => handleRotate(15)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
              >
                <RotateCw size={16} /> <span className="text-sm">Rotate +15°</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleZoom(-0.1)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <ZoomOut size={16} />
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0.4"
                    max="3"
                    step="0.01"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={() => handleZoom(0.1)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
              >
                <RefreshCcw size={16} /> <span className="text-sm">Reset</span>
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 p-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} /> <span className="text-sm">Delete</span>
              </button>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Preview options</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewWidth((w) => Math.max(240, w - 40))}
                    className="px-2 py-1 bg-gray-100 rounded-md text-sm"
                  >
                    - Width
                  </button>
                  <button
                    onClick={() => setPreviewWidth((w) => Math.min(520, w + 40))}
                    className="px-2 py-1 bg-gray-100 rounded-md text-sm"
                  >
                    + Width
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CostumePage;
