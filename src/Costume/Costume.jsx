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

/**
 * دمج التحكم الجديد للموبايل مع الكود الأصلي.
 * سلوك:
 * - على شاشات صغيرة (isMobile) نستخدم تحكم لمس: سحب، قرص (pinch) للتكبير/التصغير، تدوير بالقرص.
 * - نظهر أزرار مرئية في كل ركن لتسهيل الوصول والبدأ بالسحب من الكورنرز على الموبايل.
 * - على الديسكتوب نترك react-rnd كما هو لسهولة السحب والتغيير بالماوس.
 */

const CostumePage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);

  // === data & UI states ===
  const [uploadedImage, setUploadedImage] = useState(null);

  // transform states (used both mobile & desktop)
  const [rotation, setRotation] = useState(0); // degrees
  const [scale, setScale] = useState(1); // zoom
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

  // mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // mobile-specific drag/gesture refs & states
  const posMobileRef = useRef({ x: rndProps.x, y: rndProps.y }); // current translate for mobile
  const [posMobile, setPosMobile] = useState({ x: rndProps.x, y: rndProps.y });

  // pinch/rotate helpers
  const pinchRef = useRef({
    initialDistance: null,
    initialAngle: null,
    initialScale: null,
    initialRotation: null,
  });

  // corner-drag state (when user starts dragging from a corner handle)
  const cornerRef = useRef(null); // "tl" | "tr" | "bl" | "br" | null
  const touchStartRef = useRef(null); // {x, y, posMobile, rndProps}

  // preview width responsive
  useEffect(() => {
    const handleResize = () => {
      const w = Math.min(400, Math.max(280, window.innerWidth * 0.35));
      setPreviewWidth(w);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // keep posMobile in sync with rndProps initial
  useEffect(() => {
    posMobileRef.current = { x: rndProps.x, y: rndProps.y };
    setPosMobile({ x: rndProps.x, y: rndProps.y });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === image upload / delete ===
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedImage(URL.createObjectURL(file));
    setRotation(0);
    setScale(1);
    setRndProps({ x: 20, y: 20, width: 160, height: 200 });
    posMobileRef.current = { x: 20, y: 20 };
    setPosMobile({ x: 20, y: 20 });
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
    setRndProps({ x: 20, y: 20, width: 160, height: 200 });
    posMobileRef.current = { x: 20, y: 20 };
    setPosMobile({ x: 20, y: 20 });
  };

  const handleRotate = (deg = 15) => setRotation((r) => r + deg);
  const handleZoom = (delta) =>
    setScale((s) => Math.min(Math.max(s + delta, 0.4), 3));

  const handleReset = () => {
    setRotation(0);
    setScale(1);
    setRndProps({ x: 20, y: 20, width: 160, height: 200 });
    posMobileRef.current = { x: 20, y: 20 };
    setPosMobile({ x: 20, y: 20 });
  };

  // === desktop handlers (existing) ===
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
    // keep mobile pos in sync
    posMobileRef.current = { x: clampedX, y: clampedY };
    setPosMobile({ x: clampedX, y: clampedY });
  };

  // === mobile touch handlers ===
  const getTouchPoint = (t) => ({ x: t.clientX, y: t.clientY });

  const distanceBetween = (a, b) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const angleBetween = (a, b) => {
    return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  };

  const onTouchStart = (e, corner = null) => {
    if (!isMobile) return;
    // if two fingers — start pinch
    if (e.touches && e.touches.length === 2) {
      const t1 = getTouchPoint(e.touches[0]);
      const t2 = getTouchPoint(e.touches[1]);
      pinchRef.current.initialDistance = distanceBetween(t1, t2);
      pinchRef.current.initialAngle = angleBetween(t1, t2);
      pinchRef.current.initialScale = scale;
      pinchRef.current.initialRotation = rotation;
      cornerRef.current = null;
      touchStartRef.current = null;
      return;
    }

    // single touch — start drag or corner-resize
    const touch = e.touches ? e.touches[0] : e;
    const pt = getTouchPoint(touch);
    cornerRef.current = corner; // may be null
    touchStartRef.current = {
      x: pt.x,
      y: pt.y,
      posMobile: { ...posMobileRef.current },
      rnd: { ...rndProps },
    };
  };

  const onTouchMove = (e) => {
    if (!isMobile) return;
    // pinch (two fingers)
    if (e.touches && e.touches.length === 2 && pinchRef.current.initialDistance) {
      const t1 = getTouchPoint(e.touches[0]);
      const t2 = getTouchPoint(e.touches[1]);
      const newDist = distanceBetween(t1, t2);
      const newAngle = angleBetween(t1, t2);
      const scaleFactor = newDist / pinchRef.current.initialDistance;
      setScale(Math.min(Math.max(pinchRef.current.initialScale * scaleFactor, 0.4), 4));

      const angleDelta = newAngle - pinchRef.current.initialAngle;
      setRotation(pinchRef.current.initialRotation + angleDelta);
      return;
    }

    // single touch drag OR corner resize
    const touch = e.touches ? e.touches[0] : e;
    const pt = getTouchPoint(touch);
    if (!touchStartRef.current) return;
    const dx = pt.x - touchStartRef.current.x;
    const dy = pt.y - touchStartRef.current.y;

    if (!cornerRef.current) {
      // normal drag
      const newX = touchStartRef.current.posMobile.x + dx;
      const newY = touchStartRef.current.posMobile.y + dy;
      posMobileRef.current = { x: newX, y: newY };
      setPosMobile({ x: newX, y: newY });
    } else {
      // resize from corners — update rndProps width/height and position when necessary
      const base = touchStartRef.current.rnd;
      let newW = base.width;
      let newH = base.height;
      let newX = base.x;
      let newY = base.y;

      // choose behavior per corner
      // tl: top-left -> change width/height and move x,y
      if (cornerRef.current === "tl") {
        newW = Math.max(40, base.width - dx);
        newH = Math.max(40, base.height - dy);
        newX = base.x + dx;
        newY = base.y + dy;
      }
      // tr: top-right -> change width/height and move y
      if (cornerRef.current === "tr") {
        newW = Math.max(40, base.width + dx);
        newH = Math.max(40, base.height - dy);
        newY = base.y + dy;
      }
      // bl: bottom-left
      if (cornerRef.current === "bl") {
        newW = Math.max(40, base.width - dx);
        newH = Math.max(40, base.height + dy);
        newX = base.x + dx;
      }
      // br: bottom-right
      if (cornerRef.current === "br") {
        newW = Math.max(40, base.width + dx);
        newH = Math.max(40, base.height + dy);
      }

      setRndProps((p) => ({ ...p, width: Math.round(newW), height: Math.round(newH), x: Math.round(newX), y: Math.round(newY) }));
      // update posMobile too so transform uses same coordinates
      posMobileRef.current = { x: Math.round(newX), y: Math.round(newY) };
      setPosMobile({ x: Math.round(newX), y: Math.round(newY) });
    }
  };

  const onTouchEnd = (e) => {
    // clear pinch/corner states
    pinchRef.current = {
      initialDistance: null,
      initialAngle: null,
      initialScale: null,
      initialRotation: null,
    };
    cornerRef.current = null;
    touchStartRef.current = null;
    // also sync rndProps.x/y with mobile pos after interactions
    setRndProps((p) => ({ ...p, x: posMobileRef.current.x, y: posMobileRef.current.y }));
  };

  // helper to begin corner drag from corner button (mobile)
  const startCornerDrag = (corner, e) => {
    e.preventDefault();
    onTouchStart(e, corner);
  };

  // === export / canvas generation (keep your existing implementation) ===
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

  // === Render ===
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
                  height: previewWidth * 1.8,
                  borderRadius: 38,
                }}
              >
                <div className="absolute inset-0 p-4 rounded-2xl">
                  {uploadedImage ? (
                    // --- desktop: Rnd (mouse) | mobile: custom touch area ---
                    !isMobile ? (
                      <Rnd
                        bounds="parent"
                        size={{ width: rndProps.width, height: rndProps.height }}
                        position={{ x: rndProps.x, y: rndProps.y }}
                        onDragStop={handleDragStop}
                        onResizeStop={handleResizeStop}
                        minWidth={40}
                        minHeight={40}
                      >
                        <div className="relative w-full h-full">
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
                        </div>
                      </Rnd>
                    ) : (
                      // --- Mobile touch area ---
                      <div
                        className="relative"
                        style={{
                          width: rndProps.width,
                          height: rndProps.height,
                          transform: `translate(${posMobile.x}px, ${posMobile.y}px) scale(${scale}) rotate(${rotation}deg)`,
                          transformOrigin: "center center",
                          touchAction: "none", // important for gesture handling
                        }}
                        onTouchStart={(e) => onTouchStart(e, null)}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        // we also allow mouse events so developer can test on desktop if needed
                        onMouseDown={(e) => onTouchStart(e, null)}
                        onMouseMove={(e) => {
                          if (e.buttons) onTouchMove(e);
                        }}
                        onMouseUp={onTouchEnd}
                      >
                        <img
                          src={uploadedImage}
                          alt="uploaded"
                          className="w-full h-full object-cover rounded-sm"
                          draggable={false}
                          style={{
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                          }}
                        />

                        {/* Corner handles (one in each corner) - for mobile grab & resize */}
                        <button
                          aria-label="top-left-handle"
                          onTouchStart={(e) => startCornerDrag("tl", e)}
                          onMouseDown={(e) => startCornerDrag("tl", e)}
                          className="absolute -top-2 -left-2 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-black rounded-sm" />
                        </button>

                        <button
                          aria-label="top-right-handle"
                          onTouchStart={(e) => startCornerDrag("tr", e)}
                          onMouseDown={(e) => startCornerDrag("tr", e)}
                          className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-black rounded-sm" />
                        </button>

                        <button
                          aria-label="bottom-left-handle"
                          onTouchStart={(e) => startCornerDrag("bl", e)}
                          onMouseDown={(e) => startCornerDrag("bl", e)}
                          className="absolute -bottom-2 -left-2 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-black rounded-sm" />
                        </button>

                        <button
                          aria-label="bottom-right-handle"
                          onTouchStart={(e) => startCornerDrag("br", e)}
                          onMouseDown={(e) => startCornerDrag("br", e)}
                          className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-black rounded-sm" />
                        </button>

                        {/* Small floating controls (rotate, zoom in/out, delete) */}
                        <button
                          onTouchStart={(e) => {
                            e.preventDefault();
                            handleRotate(15);
                          }}
                          onClick={() => handleRotate(15)}
                          className="absolute top-2 left-2 bg-white/90 p-2 rounded-full shadow-md"
                        >
                          <RotateCw size={16} />
                        </button>

                        <button
                          onTouchStart={(e) => {
                            e.preventDefault();
                            handleDelete();
                          }}
                          onClick={handleDelete}
                          className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 p-1 rounded-full shadow-md flex gap-1">
                          <button
                            onTouchStart={(e) => {
                              e.preventDefault();
                              handleZoom(-0.1);
                            }}
                            onClick={() => handleZoom(-0.1)}
                            className="p-1 rounded-full"
                          >
                            <ZoomOut size={14} />
                          </button>
                          <button
                            onTouchStart={(e) => {
                              e.preventDefault();
                              handleZoom(0.1);
                            }}
                            onClick={() => handleZoom(0.1)}
                            className="p-1 rounded-full"
                          >
                            <ZoomIn size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                      <div className="text-center text-gray-400">
                        <p className="text-lg">No design yet</p>
                        <p className="text-xs mt-1">Upload an image to start</p>
                      </div>
                    </div>
                  )}
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
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              <button
                onClick={() => handleRotate(15)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 justify-center"
              >
                <RotateCw size={16} /> <span className="text-sm">Rotate +15°</span>
              </button>

              <div className="flex items-center gap-2 justify-center">
                <button onClick={() => handleZoom(-0.1)} className="p-2 rounded-md hover:bg-gray-100">
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
                <button onClick={() => handleZoom(0.1)} className="p-2 rounded-md hover:bg-gray-100">
                  <ZoomIn size={16} />
                </button>
              </div>

              <button onClick={handleReset} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 justify-center">
                <RefreshCcw size={16} /> <span className="text-sm">Reset</span>
              </button>

              <button onClick={handleDelete} className="flex items-center gap-2 p-2 rounded-md text-red-600 hover:bg-red-50 justify-center">
                <Trash2 size={16} /> <span className="text-sm">Delete</span>
              </button>

              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-2">Preview options</p>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setPreviewWidth((w) => Math.max(240, w - 40))} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                    - Width
                  </button>
                  <button onClick={() => setPreviewWidth((w) => Math.min(520, w + 40))} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
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
          <motion.div className="fixed inset-0 z-50 flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* الخلفية */}
            <motion.div className="fixed inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

            {/* محتوى الدروير */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white w-96 h-full p-6 shadow-2xl fixed right-0 top-0 flex flex-col overflow-y-auto"
            >
              <button onClick={() => setDrawerOpen(false)} className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>

              {/* معلومات المنتج */}
              <div className="flex flex-col items-center text-center mb-6 mt-8">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-40 h-40 object-contain mb-4" />
                <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                <p className="text-gray-600">{selectedProduct.price} EGP</p>
              </div>

              <h2 className="text-xl font-bold mb-5 text-gray-800 text-center">Choose your phone model</h2>

              {/* Brand */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-600 mb-2">Brand</label>
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
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Model</label>
                  <select value={phoneForm.model} onChange={(e) => setPhoneForm({ ...phoneForm, model: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm">
                    <option value="">Select model</option>
                    {phoneForm.brand === "iPhone" && ["iPhone 14 Pro", "iPhone 13", "iPhone 12"].map((m) => <option key={m}>{m}</option>)}
                    {phoneForm.brand === "Samsung" && ["S23", "S22", "A72"].map((m) => <option key={m}>{m}</option>)}
                    {phoneForm.brand === "Xiaomi" && ["13", "12", "Note 11"].map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
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

              <button onClick={handleConfirmAdd} className="mt-auto w-full bg-black text-white py-3 rounded-lg shadow-md hover:scale-105 transition">
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
