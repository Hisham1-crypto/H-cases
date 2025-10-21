import React, { useContext, useState } from "react";
import { Heart, ShoppingBag, X } from "lucide-react";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Footerr from "../Footerr/Footerr";

// BabeShark images
const imagesPage1 = [
 { id: 51, name: "Pink Labubu", price: 130, oldPrice: 180, src: "/top pick photos/photo_34_2025-10-10_07-18-14.jpg" },
  { id: 52, name: "Blue Labubu ", price: 130, oldPrice: 160, src: "/top pick photos/photo_35_2025-10-10_07-18-14.jpg" },
  { id: 53, name: "Brown Labubu", price: 130, oldPrice: 160, src: "/top pick photos/photo_36_2025-10-10_07-18-14.jpg" },
  { id: 54, name: "Dark Brown Labubu", price: 130, oldPrice: 160, src: "/top pick photos/photo_37_2025-10-10_07-18-14.jpg" },
  { id: 55, name: "Light Pink Labubu", price: 130, oldPrice: 160, src: "/top pick photos/photo_38_2025-10-10_07-18-14.jpg" },
  { id: 56, name: "Angry Pink Labubu ", price: 130, oldPrice: 160, src: "/top pick photos/photo_39_2025-10-10_07-18-14.jpg" },
 
];


// Phone Brands & Models
const phoneBrands = {
  "Apple": ["iPhone 14", "iPhone 14 Pro", "iPhone 13", "iPhone 13 Pro", "iPhone 12", "iPhone 12 Pro"],
  "Samsung": ["Samsung S23", "Samsung S23 Ultra", "Samsung S22", "Samsung S22 Plus", "Samsung S21", "Samsung S21 Ultra"],
  "Google": ["Google Pixel 8", "Google Pixel 7"]
};

const LabubuCase = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPhoneType, setSelectedPhoneType] = useState("");
  const [quantity, setQuantity] = useState(1);

  const currentImages = currentPage === 1 ? imagesPage1 : imagesPage1;

  const handleAddToCartClick = (product) => {
    // if (!user) {
    //   alert("You must log in first to add products to the cart.");
    //   navigate("/login");
    //   return;
    // }
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleConfirmOrder = () => {
    if (!selectedBrand) return alert("Please choose a brand.");
    if (!selectedPhoneType) return alert("Please choose your phone model.");



addToCart({
  id: selectedProduct.id,
  name: selectedProduct.name,
  price: selectedProduct.price,
  image: selectedProduct.src,
  phoneBrand: selectedBrand,   // ✅ لازم الاسم كده بالضبط
  phoneModel: selectedPhoneType, // ✅ لازم الاسم كده كمان
  quantity,
});


    // Reset drawer state
    setDrawerOpen(false);
    setSelectedProduct(null);
    setSelectedBrand("");
    setSelectedPhoneType("");
    setQuantity(1);
  };

  return (
 <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen text-gray-900 font-sans">
      <div className="mb-1">
        <NavBar />
      </div>
<div className="h-20"></div>
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
         Labubu Cases
        </h1>
{/* Images Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {currentImages.map((product, idx) => (
    <div key={idx} className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
      <img
        src={product.src}
        alt={`BabeShark ${idx + 1}`}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
    onClick={(e) => {
      e.stopPropagation();
      if (product.id >= 1 && product.id <= 11) {
        navigate(`/laptopsleeve/${product.id}`);
      } else if (product.id >= 12 && product.id <= 17) {
        navigate(`/funnybagdetails/${product.id}`);
      } else if (product.id >= 18 && product.id <= 25) {
        navigate(`/minibagdetails/${product.id}`);
      } else {
        navigate(`/phonedetails/${product.id}`);
      }
    }}      />

      {/* اسم وسعر المنتج */}
      <div className="p-2 text-center bg-white">
        <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">{product.price} EGP</p>
      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button
          onClick={() => handleAddToCartClick(product)}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ShoppingBag size={18} />
        </button>
<button
  onClick={() => {
    const isFav = favorites.some((fav) => fav.id === product.id);
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        image: product.src,
        price: product.price,
      });
    }
  }}
  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
>
  <Heart
    size={18}
    color={favorites.some((fav) => fav.id === product.id) ? "rgb(236,72,153)" : "black"} // 💖 بينك أو أسود
    fill={favorites.some((fav) => fav.id === product.id) ? "rgb(236,72,153)" : "none"}   // 💖 لو في المفضلة يكون ممتليء
  />
</button>
      </div>
    </div>
  ))}
</div>


        {/* Pagination */}
        {/* <div className="flex justify-center mt-10 mb-10 gap-3">
          {[1, 2].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {page}
            </button>
          ))}
        </div> */}

        {/* Drawer */}
       {drawerOpen && selectedProduct && (
  <div className="fixed inset-0 z-50 flex">
    {/* خلفية شفافة */}
    <div
      className="fixed inset-0 bg-black/50"
      onClick={() => setDrawerOpen(false)}
    ></div>

    {/* الدروير نفسه */}
    <div className="bg-white w-96 h-full p-6 shadow-2xl fixed right-0 top-0 flex flex-col  overflow-y-auto">
      <button
        onClick={() => setDrawerOpen(false)}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Product Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={selectedProduct.src}
          alt="BabeShark Case"
          className="w-40 h-40 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
        <p className="text-gray-600">{selectedProduct.price} EGP</p>
      </div>

      <h2 className="text-xl font-bold mb-5 text-gray-800">
        Choose your phone model
      </h2>

      {/* ✅ Brand */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Brand
        </label>
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedPhoneType("");
            }}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 shadow-md  focus:ring-2  transition-all outline-none"
          >
            <option value="">Choose your phone brand</option>
            {Object.keys(phoneBrands).map((brand) => (
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

      {/* ✅ Model */}
      {selectedBrand && (
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Model
          </label>
          <div className="relative">
            <select
              value={selectedPhoneType}
              onChange={(e) => setSelectedPhoneType(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 shadow-md focus:ring-2  transition-all outline-none"
            >
              <option value="">Choose phone model</option>
              {phoneBrands[selectedBrand].map((model) => (
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

      {/* ✅ Quantity */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center border border-gray-300 rounded-lg py-2 focus:ring-2 outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* ✅ Confirm Button */}
{/* ✅ Confirm + Buy Now Buttons */}
<div className="mt-auto flex flex-col gap-3">
  {/* Add to Cart */}
  <button
    onClick={() => {
      if (!selectedBrand) return alert("Please choose a brand.");
      if (!selectedPhoneType) return alert("Please choose your phone model.");

      addToCart({
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.src,
        brand: selectedBrand,
        model: selectedPhoneType,
        quantity,
      });

      setDrawerOpen(false);
      setSelectedProduct(null);
      setSelectedBrand("");
      setSelectedPhoneType("");
      setQuantity(1);
    }}
    className="w-full bg-black text-white py-3 font-thin rounded-lg shadow-md hover:scale-[1.02] transition-all"
  >
  Confirm Add To Cart
  </button>

  {/* Buy Now */}
  <button
    onClick={() => {
      if (!selectedBrand) return alert("Please choose a brand.");
      if (!selectedPhoneType) return alert("Please choose your phone model.");
const buyNowProduct = {
  id: selectedProduct.id,
  name: selectedProduct.name,
  image: selectedProduct.src,
  price: selectedProduct.price,
  phoneBrand: selectedBrand,
  phoneModel: selectedPhoneType,
  quantity,
};

localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));
setDrawerOpen(false);
navigate("/checkout");


localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));
setDrawerOpen(false);
navigate("/checkout");


      localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));
      setDrawerOpen(false);
      navigate("/checkout");
    }}
    className="w-full bg-[#56cfe1] text-white font-thin py-3 rounded-lg shadow-md hover:bg-orange-600 hover:scale-[1.02] transition-all"
  >
    Buy It Now
  </button>
</div>
    </div>
  </div>
)}
      <div><Footerr/></div>

      </div>
    </div>
  );
}

export default LabubuCase