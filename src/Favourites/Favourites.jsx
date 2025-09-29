import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { HeartIcon, ShoppingBasketIcon, Trash, X, ShoppingBag } from "lucide-react";

// أنواع الموبايلات
const allPhoneTypes = [
  "iPhone 14",
  "iPhone 14 Pro",
  "iPhone 13",
  "iPhone 13 Pro",
  "iPhone 12",
  "iPhone 12 Pro",
  "Samsung S23",
  "Samsung S23 Ultra",
  "Samsung S22",
  "Samsung S22 Plus",
  "Samsung S21",
  "Samsung S21 Ultra",
  "Google Pixel 8",
  "Google Pixel 7",
];

// المحافظات
const allProvinces = [
  { name: "Cairo", shipping: 60 },
  { name: "Giza", shipping: 60 },
  { name: "Alexandria", shipping: 63 },
  { name: "Beheira", shipping: 63 },
  { name: "Kafr El-Shiekh", shipping: 70 },
  { name: "Damietta", shipping: 70 },
  { name: "Port Said", shipping: 70 },
  { name: "Monufia", shipping: 70 },
  { name: "Qalyubia", shipping: 70 },
  { name: "Gharbia", shipping: 70 },
  { name: "Sharqia", shipping: 70 },
  { name: "Suez", shipping: 70 },
  { name: "Dakahlia", shipping: 70 },
  { name: "Ismailia", shipping: 70 },
  { name: "Sohag", shipping: 81 },
  { name: "Beni Suef", shipping: 81 },
  { name: "Minya", shipping: 81 },
  { name: "Fayoum", shipping: 81 },
  { name: "Assiut", shipping: 81 },
  { name: "Marsa Matrouh", shipping: 92 },
  { name: "Qena", shipping: 92 },
  { name: "Red Sea", shipping: 92 },
  { name: "Luxor", shipping: 92 },
  { name: "Aswan", shipping: 92 },
  { name: "North Coast", shipping: 95 },
  { name: "South Sinai", shipping: 110 },
  { name: "New Valley", shipping: 110 },
  { name: "North Sanai", shipping: 110 },
  { name: "Other", shipping: 100 },
];

const Favorites = () => {
  const { addToCart } = useContext(CartContext);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPhoneType, setSelectedPhoneType] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [address, setAddress] = useState(""); 
  const [phone, setPhone] = useState(""); // ✅ رقم التليفون

  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    setSelectedPhoneType("");
    setSelectedProvince("");
    setAddress("");
    setPhone(""); // reset
  };

  const handleAddToCartFromModal = () => {
    if (!selectedPhoneType) {
      return alert("اختر نوع الموبايل");
    }
    if (!selectedProvince) {
      return alert("اختر المحافظة");
    }
    if (!address) {
      return alert("من فضلك ادخل العنوان");
    }
    if (!phone) {
      return alert("من فضلك ادخل رقم التليفون");
    }
    if (!/^\d{11}$/.test(phone)) {
      return alert("Check Your Phone Number");
    }

    const provinceData = allProvinces.find((p) => p.name === selectedProvince);

    addToCart(
      selectedProduct,
      selectedPhoneType,
      selectedProvince,
      provinceData?.shipping || 0,
      address,
      phone // ✅ ضفنا رقم التليفون
    );

    setSelectedProduct(null);
    setSelectedPhoneType("");
    setSelectedProvince("");
    setAddress("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center flex justify-center">
          Your Favorites <HeartIcon className="m-1 text-pink-500" />
        </h2>

        {favorites.length === 0 ? (
          <p className="text-gray-600 text-center">
            You don’t have any favorites yet.
          </p>
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
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600">Price: {item.price} EGP</p>

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="text-sm bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full hover:from-orange-600 hover:to-pink-600 transition"
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

        <div className="text-center mt-6 flex justify-between">
          <Link
            to="/"
            className="text-blue-600 hover:underline hover:text-blue-800 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/shoppingbag"
            className="text-blue-600 hover:underline hover:text-blue-800 transition flex items-center gap-1"
          >
            Shopping Cart <ShoppingBasketIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ✅ المودال */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm sm:max-w-md relative shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-60 h-60 object-contain mx-auto mb-4"
            />

            <h3 className="text-xl font-bold text-gray-800 text-center">
              {selectedProduct.name}
            </h3>

            <p className="text-gray-600 text-center mb-4">
              {selectedProduct.price} EGP
              {selectedProvince && (
                <span className="block text-sm text-gray-500 mt-1">
                  Shipping to: {selectedProvince}
                </span>
              )}
            </p>

            {/* ✅ اختيار نوع الموبايل */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1 text-center">
                Choose Phone Model
              </label>
              <select
                value={selectedPhoneType}
                onChange={(e) => setSelectedPhoneType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">اختار نوع الهاتف</option>
                {allPhoneTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ اختيار المحافظة */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1 text-center">
                Choose Your Goverment
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">اختر المحافظة</option>
                {allProvinces.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} ({p.shipping} EGP)
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ خانة إدخال العنوان */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1 text-center">
                Enter Your Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="اكتب عنوانك بالتفصيل (الشارع - العمارة ...)"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* ✅ خانة إدخال رقم التليفون */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1 text-center">
                Enter Your Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(للتواصل) اكتب رقم تليفونك"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAddToCartFromModal}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
