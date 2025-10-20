import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Footerr from "../Footerr/Footerr";

const products = [
       { id: 26, title: "LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_8_2025-10-10_07-18-14.jpg" },
    { id: 27, title: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg" },
  { id: 28, title: "Green Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_17_2025-10-10_07-18-14.jpg" },
  { id: 29, title: "Blue Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_18_2025-10-10_07-18-14.jpg" },
  { id: 30, title: "Red Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_19_2025-10-10_07-18-14.jpg" },
  { id: 31, title: "Dark militairy babe shark", price: 130, oldPrice: 160, image: "/top pick photos/photo_9_2025-09-29_20-49-37.jpg" },
  { id: 32, title: "Black LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_9_2025-10-10_07-18-14.jpg" },
  { id: 34, title: "White militairy babe shark", price: 130, oldPrice: 180, image: "/top pick photos/photo_10_2025-09-29_20-49-37.jpg" },
  { id: 35, title: "Brown LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_10_2025-10-10_07-18-14.jpg" },
  { id: 36, title: "Sky Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_11_2025-10-10_07-18-14.jpg" },
  { id: 37, title: "Blue Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_12_2025-10-10_07-18-14.jpg" },
  { id: 38, title: "Pink Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_13_2025-10-10_07-18-14.jpg" },
  { id: 39, title: "Black Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_14_2025-10-10_07-18-14.jpg" },
  { id: 40, title: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_15_2025-10-10_07-18-14.jpg" },
  { id: 41, title: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg" },
  { id: 42, title: "Pink 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_20_2025-10-10_07-18-14.jpg" },
  { id: 43, title: "Pink GT3", price: 130, oldPrice: 160, image: "/top pick photos/photo_21_2025-10-10_07-18-14.jpg" },
  { id: 44, title: "Pink Porsche 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_22_2025-10-10_07-18-14.jpg" },
  { id: 45, title: "White 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_23_2025-10-10_07-18-14.jpg" },
 
   { id: 46, title: "Grey 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_24_2025-10-10_07-18-14.jpg" },
  { id: 47, title: "Bronze 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_25_2025-10-10_07-18-14.jpg" },
  { id: 48, title: "Red 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_26_2025-10-10_07-18-14.jpg" },
  { id: 49, title: "Lufi", price: 130, oldPrice: 180, image: "/top pick photos/photo_27_2025-10-10_07-18-14.jpg" },
  { id: 50, title: "Lufi", price: 130, oldPrice: 180, image: "/top pick photos/photo_28_2025-10-10_07-18-14.jpg" },
  { id: 51, title: "Pink Labubu", price: 130, oldPrice: 180, image: "/top pick photos/photo_34_2025-10-10_07-18-14.jpg" },
  { id: 52, title: "Blue Labubu ", price: 130, oldPrice: 160, image: "/top pick photos/photo_35_2025-10-10_07-18-14.jpg" },
  { id: 53, title: "Brown Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_36_2025-10-10_07-18-14.jpg" },
  { id: 54, title: "Dark Brown Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_37_2025-10-10_07-18-14.jpg" },
  { id: 55, title: "Light Pink Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_38_2025-10-10_07-18-14.jpg" },
  { id: 56, title: "Angry Pink Labubu ", price: 130, oldPrice: 160, image: "/top pick photos/photo_39_2025-10-10_07-18-14.jpg" },
  { id: 57, title: "Lufi", price: 130, oldPrice: 160, image: "/top pick photos/photo_29_2025-10-10_07-18-14.jpg" },
  { id: 58, title: "Lufi ", price: 130, oldPrice: 160, image: "/top pick photos/photo_30_2025-10-10_07-18-14.jpg" },
  { id: 59, title: "Lufi", price: 130, oldPrice: 160, image: "/top pick photos/photo_31_2025-10-10_07-18-14.jpg" },
  { id: 60, title: "Lufu", price: 130, oldPrice: 160, image: "/top pick photos/photo_32_2025-10-10_07-18-14.jpg" },
      { 
      id:113,
      image: "/tigercase/tiger3.jpg",
       title:"Cheetah 2 case",
           oldPrice: 160,

        price: 130 },

  {id:114, image: "/tigercase/tiger4.jpg",    oldPrice: 160,
 title:"Brown tiger case", price: 130 },

{
    id: 61,
    title: "Red Babe Shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_1_2025-09-29_20-49-37.jpg",
  },
      { image: "/babesharkcase/shark9.jpg",
      id: 111,   
      oldPrice: 160,
      title: "Pink babe shark" ,
      price: 130 },
          {
      id:112 ,
      image: "/babesharkcase/shark4.jpg",
      title: "White military babe shark" ,
      price: 130,
      oldPrice: 160,

    },
    {
    id: 62,
    title: "Tiger Case",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_1_2025-10-10_07-18-14.jpg",
  },
  
  {
    id: 63,
    title: "Blue - Purple babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-09-29_20-49-37.jpg",
  },
  {
    id: 64,
    title: "Black  Tiger case",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-10-10_07-18-14.jpg",
  },
  {
    id: 65,
    title: "Militairy - black babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_3_2025-09-29_20-49-37.jpg",
  },
    {
    id: 66,
    title: "Red - black babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_4_2025-09-29_20-49-37.jpg",
  },
     {
    id: 67,
    title: "Pink - blue babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_5_2025-09-29_20-49-37.jpg",
  },
     {
    id: 68,
    title: "Brown tiger",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_5_2025-10-10_07-18-14.jpg",
  },
       {
    id: 69,
    title: "Dark militairy - black babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_6_2025-09-29_20-49-37.jpg",
  },
        {
    id: 70,
    title: "Blue LV",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_6_2025-10-10_07-18-14.jpg",
  },
          {
    id: 71,
    title: "Black babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_7_2025-09-29_20-49-37.jpg",
  },
           {
    id: 72,
    title: "Black - white LV",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_7_2025-10-10_07-18-14.jpg",
  },
             {
    id: 73,
    title: "Purple - mint babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_8_2025-09-29_20-49-37.jpg",
  },


];
const phoneData = {
  iPhone: ["iPhone 14 Pro","iPhone 14 Pro Max", "iPhone 14", "iPhone 13"],
  Samsung: ["Samsung S23", "Samsung S22", "Samsung A72"],
  Xiaomi: ["Xiaomi 13", "Xiaomi 12", "Xiaomi Note 11"],
};


const Phonecoverdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const product = products.find((p) => p.id === Number(id));
  const relatedProducts = products.filter((p) => p.id !== product.id);

  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      brand: selectedBrand,
      model: selectedModel,
      quantity,
    };
    addToCart(cartItem);
  };

  const handleFavorite = () => {
    const favoriteItem = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      brand: selectedBrand,
      model: selectedModel,
      quantity,
    };
    addToFavorites(favoriteItem);
  };
const handleBuyNow = () => {
  const checkoutItem = {
    id: product.id,
    name: product.title,
    image: product.image,
    price: product.price,
    phoneBrand: selectedBrand,   // ✅ لازم الاسم كده علشان CartContext و Checkout يقرؤوه صح
    phoneModel: selectedModel,   // ✅ نفس الشيء
    quantity,
  };

  // ✅ خزن المنتج في localStorage
  localStorage.setItem("checkout_item", JSON.stringify(checkoutItem));

  // ✅ روح لصفحة الدفع
  navigate("/checkout");
};

  return (
    <div className="min-h-screen bg-gray-50 mb-20">
      <NavBar />
<div className="h-20"></div>
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-10 mt-20">
        {/* صورة المنتج */}
        <div className="md:w-1/2 bg-white rounded-2xl shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[450px] object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="md:w-1/2 flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          {/* السعر */}
          <div className="flex items-center gap-3">
           
            <span className="text-green-600 text-2xl font-bold">
              EGP {product.price}
            </span>
            <span className="bg-yellow-300 text-xs font-semibold px-2 py-1 rounded-full text-gray-700">
              SALE
            </span>
          </div>

          {/* اختيار البراند */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel("");
              }}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">-- Choose Brand --</option>
              {Object.keys(phoneData).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* اختيار الموديل */}
          {selectedBrand && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Select Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="">-- Choose Model --</option>
                {phoneData[selectedBrand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* الكمية */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-3 py-1 rounded text-lg font-bold"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleFavorite}
              className="flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-full font-medium shadow-sm transition-all"
            >
              <Heart className="text-pink-500" />
              Add to Favorites
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!selectedBrand || !selectedModel}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                !selectedBrand || !selectedModel
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-lime-400 hover:bg-lime-500 text-gray-800"
              }`}
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!selectedBrand || !selectedModel}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                !selectedBrand || !selectedModel
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-300 hover:bg-yellow-400 text-gray-800"
              }`}
            >
              Buy It Now
            </button>
          </div>

          {/* تفاصيل المنتج */}
          <div className="mt-8 border-t pt-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Product Details
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Soft and flexable silicon cover.</li>
              <li>• Printed with hight quality inks.</li>
              <li>• Transparent Frame</li>
           
            </ul>
          </div>
        </div>
      </div>
      
      {/* 🔻 Things You May Like Section */}
      <div className="max-w-6xl mx-auto px-6 mt-20 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Things You May Like
        </h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {relatedProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                onClick={() => navigate(`/phonedetails/${item.id}`)}
                className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {item.title}
                </h3>
                <p className="text-green-600 font-bold">EGP {item.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
            <div><Footerr/></div>
      
    </div>
  );
};

export default Phonecoverdetails;