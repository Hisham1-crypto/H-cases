import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { HeartIcon, ShoppingBasketIcon, Trash, X, ShoppingBag, Heart, Heading1 } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

// بيانات البراندات والموديلات
const phoneData = {
  iPhone: ["iPhone 14 Pro", "iPhone 14", "iPhone 13"],
  Samsung: ["Samsung S23", "Samsung S22", "Samsung A72"],
  Xiaomi: ["Xiaomi 13", "Xiaomi 12", "Xiaomi Note 11"],
};

const Favorites = () => {
  const { addToCart } = useContext(CartContext);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🟢 فورم البراند والموديل والكمية
  const [phoneForm, setPhoneForm] = useState({
    brand: "",
    model: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // فتح الدروير
  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  // تأكيد الإضافة
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

  // ✅ إضافة المنتج للسلة كمنتج جديد دايمًا
  addToCart({ ...fullProduct });

  setDrawerOpen(false);
  setPhoneForm({ brand: "", model: "", quantity: 1 });
};

  return (
    <div className="mb-20">
      <NavBar />
      <div className="h-8"></div>
      <div className="mt-20 min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto p-6 rounded-2xl ">
          {/* <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center flex justify-center">
            Your Wishlist <HeartIcon className="m-1 text-pink-500" />
          </h1> */}

          {favorites.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="relative">
      {/* القلب */}
      <Heart
    className="w-48 h-48 text-gray-300 "
        strokeWidth={1.1}
      />
      {/* علامة X */}
      <X
        className="w-20 h-20 text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
        strokeWidth={2}
      />
    </div>
<h1 className="text-black text-center text-4xl font-bold mt-8" strokeWidth={1}>
        Wishlist is empty.
    </h1>
   <div className="text-gray-600 leading-relaxed mt-7">
    <p className="text-center">You don't have any products in the wishlist yet.</p>
    <p>
      You will find a lot of interesting products on our{" "}
      <span className="font-medium text-gray-800">"Shop"</span> page.
    </p>
  </div>
  </div>
) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-contain mb-3 cursor-pointer"
                    onClick={() => setSelectedImage(item.image)}
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">Price: {item.price} EGP</p>

                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => handleAddToCartClick(item)}
                      className="text-white text-sm bg-black px-3 py-1 rounded-full hover:from-orange-600 hover:to-pink-600 transition"
                    >
                      Add to cart
                    </button>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

         
        </div>
      </div>

      {/* 🟡 Drawer بنفس نظام Home */}
      <AnimatePresence>
        {drawerOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* الخلفية */}
            <motion.div
              className="fixed inset-0 bg-black/50 "
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

              {/* Product Info */}
              <div className="flex flex-col items-center text-center mb-6">
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
                <div className="relative">
                  <select
                    value={phoneForm.brand}
                    onChange={(e) =>
                      setPhoneForm({
                        ...phoneForm,
                        brand: e.target.value,
                        model: "",
                      })
                    }
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 shadow-md  focus:ring-2  transition-all outline-none"
                  >
                    <option value="">Choose your phone brand</option>
                    {Object.keys(phoneData).map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </span>
                </div>
              </div>

              {/* Model */}
              {phoneForm.brand && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Model
                  </label>
                  <div className="relative">
                    <select
                      value={phoneForm.model}
                      onChange={(e) =>
                        setPhoneForm({ ...phoneForm, model: e.target.value })
                      }
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 shadow-md focus:ring-2  transition-all outline-none"
                    >
                      <option value="">Phone model</option>
                      {phoneData[phoneForm.brand].map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      ▼
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setPhoneForm({
                        ...phoneForm,
                        quantity: Math.max(1, phoneForm.quantity - 1),
                      })
                    }
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
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
                    className="w-16 text-center border border-gray-300 rounded-lg py-2 focus:ring-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPhoneForm({
                        ...phoneForm,
                        quantity: phoneForm.quantity + 1,
                      })
                    }
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleConfirmAdd}
                className="mt-auto w-full bg-black font-thin text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition"
              >
                Confirm Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟣 Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative bg-white rounded-2xl p-3 max-w-md w-full">
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1"
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-[400px] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
      <div>
        {/* Footer */}
              <Footer container>
                <div className="w-full">
                  <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                      <div>
                        <FooterTitle title="Follow us" />
                        <FooterLinkGroup col>
                          <FooterLink href="#">Instagram</FooterLink>
                          <FooterLink href="#">Facebook</FooterLink>
                        </FooterLinkGroup>
                      </div>
                      <div>
                        <FooterTitle title="Legal" />
                        <FooterLinkGroup col>
                          <FooterLink href="#">Privacy Policy</FooterLink>
                          <FooterLink href="#">Terms & Conditions</FooterLink>
                        </FooterLinkGroup>
                      </div>
                    </div>
                  </div>
                  <FooterDivider />
                  <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright
                      href="#"
                      by="H-Cases"
                      year={new Date().getFullYear()}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                      <FooterIcon href="#" icon={BsFacebook} />
                      <FooterIcon href="#" icon={BsInstagram} />
                      <FooterIcon href="#" icon={BsTwitter} />
                    </div>
                  </div>
                </div>
              </Footer>
      </div>
    </div>
  );
};

export default Favorites;
