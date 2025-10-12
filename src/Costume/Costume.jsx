// CostumePage.jsx
import React, { useState, useRef, useContext } from "react";
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
    x: 40,
    y: 100,
    width: 200,
    height: 260,
  });

  const designRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedImage(URL.createObjectURL(file));
    setRotation(0);
    setScale(1);
  };

  const handleDelete = () => {
    setUploadedImage(null);
    setRotation(0);
    setScale(1);
  };

  const handleRotate = (deg = 15) => setRotation((r) => r + deg);
  const handleZoom = (delta) =>
    setScale((s) => Math.min(Math.max(s + delta, 0.5), 3));

  const handleReset = () => {
    setRotation(0);
    setScale(1);
    setRndProps({ x: 40, y: 100, width: 200, height: 260 });
  };

  // حفظ الصورة (Download)
  const handleSave = async () => {
    if (!designRef.current) return;
    const canvas = await html2canvas(designRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "custom-case.png";
    link.click();
  };

  // توليد صورة التصميم (dataUrl)
  const generateDesignImage = async () => {
    if (!designRef.current) return null;
const canvas = await html2canvas(designRef.current, { useCORS: true, backgroundColor: null, scale: 2 });
 const { width, height } = designRef.current.getBoundingClientRect();

  // قص الصورة على نفس أبعاد الـ designRef
  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = width * 2;  // نضرب في scale
  croppedCanvas.height = height * 2;

  const ctx = croppedCanvas.getContext("2d");

  ctx.drawImage(
    canvas,
    0, 0, croppedCanvas.width, croppedCanvas.height, // من الصورة الأصلية
    0, 0, croppedCanvas.width, croppedCanvas.height  // إلى الصورة الجديدة
  );

  return croppedCanvas.toDataURL("image/png");

  };

  // إضافة للسلة
  const handleAddToCart = async () => {
    const image = await generateDesignImage();
    const product = {
      id: Date.now(),
      name: "Custom Case",
      price: 80,
      image,
    };
    addToCart(product);
  };

  // إضافة للمفضلة
  const handleAddToFavorites = async () => {
    const image = await generateDesignImage();
    const product = {
      id: Date.now(),
      name: "Custom Case",
      price: 80,
      image,
    };
    addToFavorites(product);
  };

  return (
    <div>
      <div className="mb-20">
        <NavBar />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 flex flex-col items-center p-8 text-white">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Customize Your Case
        </h1>

        {/* منطقة المعاينة */}
        <div
          ref={designRef}
          className="relative w-[280px] sm:w-[250px] md:w-[320px] lg:w-[360px] xl:w-[400px] aspect-[9/18] mb-8 overflow-hidden rounded-[30px]"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "30px",
          }}
        >
          {uploadedImage ? (
            <Rnd
              bounds="parent"
              size={{ width: rndProps.width, height: rndProps.height }}
              position={{ x: rndProps.x, y: rndProps.y }}
              onDragStop={(e, d) =>
                setRndProps((p) => ({ ...p, x: d.x, y: d.y }))
              }
              onResizeStop={(e, direction, ref, delta, position) =>
                setRndProps({
                  width: parseInt(ref.style.width, 10),
                  height: parseInt(ref.style.height, 10),
                  x: position.x,
                  y: position.y,
                })
              }
            >
              <img
                src={uploadedImage}
                alt="Uploaded Design"
                className="w-full h-full object-cover"
                style={{
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  transformOrigin: "center",
                }}
                draggable={false}
              />
            </Rnd>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <p className="mb-2">📸 Upload an image to start</p>
              <p className="text-xs">
                Move, resize, rotate, and customize freely
              </p>
            </div>
          )}

          {/* صورة الجراب */}
          <img
            src="/caseee (1)22.png"
            alt="Case"
            className="absolute inset-0 w-full h-full p-7 object-contain pointer-events-none"
            style={{
              zIndex: 10,
            }}
          />
        </div>

        {/* الأدوات */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <label className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg shadow cursor-pointer hover:opacity-90">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {uploadedImage && (
            <>
              <button
                onClick={() => handleRotate(15)}
                className="bg-blue-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <RotateCw size={16} /> Rotate
              </button>
              <button
                onClick={() => handleZoom(0.1)}
                className="bg-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
              >
                <ZoomIn size={16} /> Zoom In
              </button>
              <button
                onClick={() => handleZoom(-0.1)}
                className="bg-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
              >
                <ZoomOut size={16} /> Zoom Out
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300"
              >
                <RefreshCcw size={16} /> Reset
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
              >
                <Trash2 size={16} /> Delete
              </button>
            </>
          )}
        </div>

        {/* الحفظ والإضافة */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleSave}
            className="bg-green-600 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Save size={18} /> Save Design
          </button>

          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-slate-800 to-gray-900 px-5 py-2 rounded-lg flex items-center gap-2 hover:from-slate-700 hover:to-gray-800"
          >
            <ShoppingBag size={18} /> Add to Cart (80 EGP)
          </button>

          <button
            onClick={handleAddToFavorites}
            className="bg-pink-600 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
          >
            <Heart size={18} /> Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostumePage;
