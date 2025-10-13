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
  X,
} from "lucide-react";
import html2canvas from "html2canvas";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import NavBar from "../NavBar/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Footer/Footer";


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
  const [previewWidth, setPreviewWidth] = useState(320);
const [drawerOpen, setDrawerOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

const [phoneForm, setPhoneForm] = useState({
  brand: "",
  model: "",
  quantity: 1,
});
  useEffect(() => {
    const handleResize = () => {
      const w = Math.min(400, Math.max(280, window.innerWidth * 0.35));
      setPreviewWidth(w);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // ✅ إصلاح نهائي للـ crop لتقليل الطول المبالغ فيه
  const generateCroppedCanvas = async () => {
    if (!designRef.current) return null;

    try {
      const element = designRef.current;
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });

      const fullW = canvas.width;
      const fullH = canvas.height;

      // نحدد إطار الاقتصاص المناسب للجراب بالضبط
      const cropWidth = fullW * 0.76;
      const cropHeight = fullH * 0.68; // 👈 تم تقليل الارتفاع هنا لتصحيح الشكل

      const cropX = (fullW - cropWidth) / 2;
      const cropY = (fullH - cropHeight) / 2.15;

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
      price: 200,
      image: objectUrl,
    };
    setSelectedProduct(product);
    setDrawerOpen(true); // افتح الدروير بدل الإضافة المباشرة
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
};
const handleConfirmAdd = () => {
  if (!phoneForm.brand) {
    alert("Please select brand");
    return;
  } else if (!phoneForm.model) {
    alert("Please select model");
    return;
  }

  const fullProduct = {
    ...selectedProduct,
    brand: phoneForm.brand,
    model: phoneForm.model,
    quantity: Number(phoneForm.quantity) || 1,
  };

  addToCart(fullProduct);

  // reset
  setDrawerOpen(false);
  setPhoneForm({ brand: "", model: "", quantity: 1 });
};


  const handleAddToFavorites = async () => {
    try {
      const blob = await generateDesignBlob();
      if (!blob) return;
      const objectUrl = URL.createObjectURL(blob);
      const product = {
        id: Date.now(),
        name: "Custom Case",
        price: 200,
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
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 mb-20">
      <NavBar />
      <div className="h-20"></div>

      <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
  {/* Preview column */}
  <div className="w-full flex flex-col items-center">
    <div className="w-full max-w-[520px]">
      <div className="mb-4 text-left">
        <h2 className="text-2xl font-semibold text-center lg:text-left">Customize Your Case</h2>
        <p className="text-sm text-gray-600 mt-1 text-center lg:text-left">
          Upload design, move it inside the case, rotate & zoom. When ready add to cart or save.
        </p>
      </div>

      <div
        ref={designRef}

        className="relative mx-auto bg-white rounded-3xl overflow-hidden shadow-lg"
        style={{
          width: "100%",
          maxWidth: previewWidth,
          height:previewWidth * 1.8,
          borderRadius: 38,
        }}
      >
        <div className="absolute inset-0 p-4 rounded-2xl">
          {uploadedImage ? (
  <>
    <Rnd
      className="touch-none"
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
          borderRadius: 28,
          width: "100%",
        }}
        draggable={false}
      />
    </Rnd>

    {/* ✅ لوحة تحكم للموبايل فقط */}
    {isMobile && (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 bg-white/90 p-2 rounded-xl shadow-lg backdrop-blur-sm z-50">
        <div className="flex gap-2">
          <button
            onClick={() => setRndProps(p => ({ ...p, y: p.y - 10 }))}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            ⬆️
          </button>
          <button
            onClick={() => setRndProps(p => ({ ...p, y: p.y + 10 }))}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            ⬇️
          </button>
          <button
            onClick={() => setRndProps(p => ({ ...p, x: p.x - 10 }))}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            ⬅️
          </button>
          <button
            onClick={() => setRndProps(p => ({ ...p, x: p.x + 10 }))}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            ➡️
          </button>
        </div>

        <div className="flex gap-2 mt-1 justify-center w-full">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            ➕
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            ➖
          </button>
          <button
            onClick={() => handleRotate(15)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            🔄
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:scale-95"
          >
            ♻️
          </button>
        </div>
      </div>
    )}
  </>
) : (
  <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
    <div className="text-center text-gray-400">
      <p className="text-lg">No design yet</p>
      <p className="text-xs mt-1">Upload an image to start</p>
    </div>
  </div>
)}

           
            <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center text-gray-400">
                <p className="text-lg">No design yet</p>
                <p className="text-xs mt-1">Upload an image to start</p>
              </div>
            </div>
          
        </div>

        <img
          src="\caseee112233.png"
          alt="case-overlay"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 10, objectFit: "contain" }}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
    
        <button
          onClick={handleAddToCart}
          className="inline-flex items-center gap-2 bg-[#56cfe1] text-white px-4 py-2 rounded-lg shadow hover:opacity-95 "
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
  <aside className="w-full lg:w-[240px] bg-white rounded-lg p-4 shadow-sm mt-8 lg:mt-0">
    <div className="flex flex-col gap-3">
      <label className="flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200">
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
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 justify-center"
      >
        <RotateCw size={16} /> <span className="text-sm">Rotate +15°</span>
      </button>

      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={() => handleZoom(-0.1)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <ZoomOut size={16} />
        </button>
        <div className="flex-1 max-w-[150px]">
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
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 justify-center"
      >
        <RefreshCcw size={16} /> <span className="text-sm">Reset</span>
      </button>

      <button
        onClick={handleDelete}
        className="flex items-center gap-2 p-2 rounded-md text-red-600 hover:bg-red-50 justify-center"
      >
        <Trash2 size={16} /> <span className="text-sm">Delete</span>
      </button>

      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500 mb-2">Preview options</p>
        <div className="flex gap-2 justify-center">
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
      <AnimatePresence>
  {drawerOpen && selectedProduct && (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* الخلفية */}
      <motion.div
        className="fixed inset-0 bg-black/50"
        onClick={() => setDrawerOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* محتوى الدروير */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white w-96 h-full p-6 shadow-2xl fixed right-0 top-0 flex flex-col overflow-y-auto"
      >
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>

        {/* معلومات المنتج */}
        <div className="flex flex-col items-center text-center mb-6 mt-8">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-40 h-40 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
          <p className="text-gray-600">{selectedProduct.price} EGP</p>
        </div>

        <h2 className="text-xl font-bold mb-5 text-gray-800 text-center">
          Choose your phone model
        </h2>

        {/* Brand */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Brand
          </label>
          <select
            value={phoneForm.brand}
            onChange={(e) =>
              setPhoneForm({
                ...phoneForm,
                brand: e.target.value,
                model: "",
              })
            }
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm"
          >
            <option value="">Choose brand</option>
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>
        </div>

        {/* Model */}
        {phoneForm.brand && (
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Model
            </label>
            <select
              value={phoneForm.model}
              onChange={(e) =>
                setPhoneForm({ ...phoneForm, model: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm"
            >
              <option value="">Select model</option>
              {phoneForm.brand === "iPhone" &&
                ["iPhone 14 Pro", "iPhone 13", "iPhone 12"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              {phoneForm.brand === "Samsung" &&
                ["S23", "S22", "A72"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              {phoneForm.brand === "Xiaomi" &&
                ["13", "12", "Note 11"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
            </select>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={phoneForm.quantity}
            onChange={(e) =>
              setPhoneForm({
                ...phoneForm,
                quantity: Number(e.target.value),
              })
            }
            className="w-20 border border-gray-300 rounded-lg py-2 px-3 text-center"
          />
        </div>

        <button
          onClick={handleConfirmAdd}
          className="mt-auto w-full bg-black text-white py-3 rounded-lg shadow-md hover:scale-105 transition"
        >
          Confirm Add to Cart
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default CostumePage;
