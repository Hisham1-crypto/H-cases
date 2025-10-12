import React, { useContext, useState } from "react";
import { Heart, ShoppingBag, X } from "lucide-react";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { AuthContext } from "../AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import {
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  Footer,
  FooterIcon,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Products
const products = [
  { id: 1, name: "Case - Abstract Orange", price: 150, image: "/case1.jpg" },
  { id: 2, name: "Case - Pink Minimal", price: 180, image: "/case2.jpg" },
  { id: 3, name: "Case - Black Marble", price: 200, image: "/case3.jpg" },
];
const featuredProducts = [
  { id: 1, title: "LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_8_2025-10-10_07-18-14.jpg" },
    { id: 11, title: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg" },
  { id: 12, title: "Green Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_17_2025-10-10_07-18-14.jpg" },
  { id: 13, title: "Blue Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_18_2025-10-10_07-18-14.jpg" },
  { id: 14, title: "Red Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_19_2025-10-10_07-18-14.jpg" },
  { id: 2, title: "Dark militairy babe shark", price: 130, oldPrice: 160, image: "/top pick photos/photo_9_2025-09-29_20-49-37.jpg" },
  { id: 3, title: "Black LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_9_2025-10-10_07-18-14.jpg" },
  { id: 4, title: "White militairy babe shark", price: 130, oldPrice: 180, image: "/top pick photos/photo_10_2025-09-29_20-49-37.jpg" },
  { id: 5, title: "Brown LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_10_2025-10-10_07-18-14.jpg" },
  { id: 6, title: "Sky Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_11_2025-10-10_07-18-14.jpg" },
  { id: 7, title: "Blue Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_12_2025-10-10_07-18-14.jpg" },
  { id: 8, title: "Pink Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_13_2025-10-10_07-18-14.jpg" },
  { id: 9, title: "Black Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_14_2025-10-10_07-18-14.jpg" },
  { id: 10, title: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_15_2025-10-10_07-18-14.jpg" },
  { id: 11, title: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg" },
  { id: 15, title: "Pink 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_20_2025-10-10_07-18-14.jpg" },
  { id: 16, title: "Pink GT3", price: 130, oldPrice: 160, image: "/top pick photos/photo_21_2025-10-10_07-18-14.jpg" },
  { id: 17, title: "Pink Porsche 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_22_2025-10-10_07-18-14.jpg" },
  { id: 18, title: "White 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_23_2025-10-10_07-18-14.jpg" },






];

const morecases = [
  { id: 1, title: "Grey 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_24_2025-10-10_07-18-14.jpg" },
  { id: 1, title: "Bronze 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_25_2025-10-10_07-18-14.jpg" },
  { id: 3, title: "Red 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_26_2025-10-10_07-18-14.jpg" },
  { id: 4, title: "Lufi", price: 130, oldPrice: 180, image: "/top pick photos/photo_27_2025-10-10_07-18-14.jpg" },
  { id: 5, title: "Lufi", price: 130, oldPrice: 180, image: "/top pick photos/photo_28_2025-10-10_07-18-14.jpg" },
  { id: 6, title: "Pink Labubu", price: 130, oldPrice: 180, image: "/top pick photos/photo_34_2025-10-10_07-18-14.jpg" },
  { id: 7, title: "Blue Labubu ", price: 130, oldPrice: 160, image: "/top pick photos/photo_35_2025-10-10_07-18-14.jpg" },
  { id: 8, title: "Brown Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_36_2025-10-10_07-18-14.jpg" },
  { id: 9, title: "Dark Brown Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_37_2025-10-10_07-18-14.jpg" },
  { id: 10, title: "Light Pink Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_38_2025-10-10_07-18-14.jpg" },
  { id: 11, title: "Angry Pink Labubu ", price: 130, oldPrice: 160, image: "/top pick photos/photo_39_2025-10-10_07-18-14.jpg" },
  { id: 15, title: "Lufi", price: 130, oldPrice: 160, image: "/top pick photos/photo_29_2025-10-10_07-18-14.jpg" },
  { id: 16, title: "Lufi ", price: 130, oldPrice: 160, image: "/top pick photos/photo_30_2025-10-10_07-18-14.jpg" },
  { id: 17, title: "Lufi", price: 130, oldPrice: 160, image: "/top pick photos/photo_31_2025-10-10_07-18-14.jpg" },
  { id: 18, title: "Lufu", price: 130, oldPrice: 160, image: "/top pick photos/photo_32_2025-10-10_07-18-14.jpg" },






];

const products2 = [
  {
    id: 1,
    title: "Red Babe Shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_1_2025-09-29_20-49-37.jpg",
  },
  
    {
    id: 2,
    title: "Tiger Case",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_1_2025-10-10_07-18-14.jpg",
  },
  
  {
    id: 3,
    title: "Blue - Muve babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-09-29_20-49-37.jpg",
  },
  {
    id: 4,
    title: "Black  Tiger case",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-10-10_07-18-14.jpg",
  },
  {
    id: 5,
    title: "Militairy - black babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_3_2025-09-29_20-49-37.jpg",
  },
    {
    id: 6,
    title: "Red - black babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_4_2025-09-29_20-49-37.jpg",
  },
     {
    id: 7,
    title: "Pink - blue babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_5_2025-09-29_20-49-37.jpg",
  },
     {
    id: 8,
    title: "Brown tiger",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_5_2025-10-10_07-18-14.jpg",
  },
       {
    id: 9,
    title: "Dark militairy - black babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_6_2025-09-29_20-49-37.jpg",
  },
        {
    id: 10,
    title: "Blue LV",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_6_2025-10-10_07-18-14.jpg",
  },
          {
    id: 11,
    title: "Black babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_7_2025-09-29_20-49-37.jpg",
  },
           {
    id: 12,
    title: "Black - white LV",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_7_2025-10-10_07-18-14.jpg",
  },
             {
    id: 13,
    title: "Purple - mint babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_8_2025-09-29_20-49-37.jpg",
  },
];
// Phone Brands & Models
const phoneData = {
  iPhone: ["iPhone 14 Pro","iPhone 14 Pro Max", "iPhone 14", "iPhone 13"],
  Samsung: ["Samsung S23", "Samsung S22", "Samsung A72"],
  Xiaomi: ["Xiaomi 13", "Xiaomi 12", "Xiaomi Note 11"],
};

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Modal state
  const [modalProduct, setModalProduct] = useState(null);

  // بيانات الموبايل
  const [phoneForm, setPhoneForm] = useState({
    brand: "",
    model: "",
    quantity: 1,
  });

  // 🟡 Add to Cart Click
 // 🟡 Add to Cart Click
const handleAddToCartClick = (product) => {
  // لو المنتج فيه title بس، نخليه name عشان الدروير يشتغل صح
  setSelectedProduct({ ...product, name: product.name || product.title });
  setDrawerOpen(true);
};

  // 🟡 Confirm Add ✅ (تم إصلاح الأقواس هنا)
  const handleConfirmAdd = () => {
    if (!phoneForm.brand) {
      alert("Please select brand ");
      return;
    } else if (!phoneForm.model) {
      alert("Please select model ");
      return;
    }

    const fullProduct = {
      ...selectedProduct,
      phoneBrand: phoneForm.brand,
      phoneModel: phoneForm.model,
      quantity: phoneForm.quantity,
    };
    addToCart(fullProduct);
    setDrawerOpen(false);
    setPhoneForm({ brand: "", model: "", quantity: 1 });
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen text-gray-900">
      {/* Navbar */}
      <div className="mb-20">
        <NavBar onSearch={setSearchQuery} />
      </div>

{/* Hero Section with Swiper */}
<section className="relative w-full">
  <Swiper
    modules={[Autoplay, Pagination, Navigation]}
    autoplay={{ delay: 4000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    navigation={true}
    loop={true}
    className="w-full h-[80vh]"
  >
    {/* Slide 1 */}
    <SwiperSlide>
<div
  className="
    w-full min-h-[100vh] 
    bg-center bg-contain bg-no-repeat 
    flex flex-col justify-center items-center text-center text-white
  "
        style={{ backgroundImage: "url('/slide photo1.jpg')"  }}
      >
        <div className="bg-black/40 w-full h-full absolute inset-0" />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Discover a case that describes your personality
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Best materials - Exclusive designs - Fast delivery to all provinces
          </p>
          <button
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#14827] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    </SwiperSlide>

    {/* Slide 2 */}
    <SwiperSlide>
     <div
  className="
    w-full min-h-[100vh] 
    bg-center bg-contain bg-no-repeat 
    flex flex-col justify-center items-center text-center text-white
  "
        style={{ backgroundImage: "url('/slide photo 3.jpg')" }}
      >
        <div className="bg-black/40 w-full h-full absolute inset-0" />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Premium cover & printing
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Stylish. Durable. Designed for You.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-bg-[#14827] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    </SwiperSlide>

    {/* Slide 3 */}
    <SwiperSlide>
    <div
  className="
    w-full min-h-[100vh] 
    bg-center bg-contain bg-no-repeat 
    flex flex-col justify-center items-center text-center text-white
  "  style={{ backgroundImage: "url('/slide  photo2.jpg')" }}
      >
        <div className="bg-black/40 w-full h-full absolute inset-0" />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Express Your Style with H-Cases
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Unique cases crafted for your lifestyle
          </p>
          <button
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#14827] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</section>
{/* 🟡 Category Grid Section (Responsive & Balanced) */}
<section id="categories" className="px-4 py-16 max-w-7xl mx-auto">
  <h2 className="text-3xl font-bold text-center mb-12 text-[#14827]">
    Shop by Category
  </h2>

  <div
    className="
      grid 
      grid-cols-2 sm:grid-cols-2 md:grid-cols-3 
      auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px] 
      gap-4 sm:gap-6
    "
  >
    {/* 🟤  Phone Cover (Big One) */}
    <div className="relative group rounded-3xl overflow-hidden md:row-span-2 h-100 md:col-span-1 col-span-2 md:col-auto">
      <img
        src="/phone cover.jpg"
        alt=" Phone Cover"
  className="w-full h-[215px] sm:h-[350px] md:h-[400px] lg:h-[590px] p-0 m-0 object-contain sm:object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
      <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg text-center px-2">
        Phone Cover
      </h3>
    </div>

    {/* 🟡  Airpods case */}
    <div className="relative group rounded-3xl overflow-hidden">
      <img
        src="\airpods case.jpeg"
        alt="Airpods case"
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
      <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
        Airpods case
      </h3>
    </div>

    {/* 🟢 Pop socket */}
    <div className="relative group rounded-3xl overflow-hidden">
      <img
        src="\popsocket.jpeg"
        alt=" Pop socket"
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
      <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg text-center px-2">
       Pop socket
      </h3>
    </div>

    {/* 🔵 Costume */}
    <div className="relative group rounded-3xl overflow-hidden col-span-2 md:col-span-1">
      <img
        src="\costume.jpeg"
        alt="Costume"
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
      <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
       Costume
      </h3>
    </div>
  </div>
</section>

{/* Products Section */}
<div id="products" className="p-6 max-w-6xl mx-auto">
 {/* توب بيك سوايبر */}
<section className="py-12 bg-white">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
    Top Picks
  </h2>

  <div className="relative">
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="px-6"
    >
      {products2.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="bg-white py-12 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden relative group">
            {/* ❤️ فيفوريت */}
            <button
              onClick={() => addToFavorites(product)}
              className="absolute top-3 left-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition z-10"
            >
              <Heart className="w-5 h-5 text-black" />
            </button>

            {/* 🛒 زرار السلة */}
            <button
              onClick={() => handleAddToCartClick(product)}
              className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition z-10"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
            </button>

            {/* صورة المنتج */}
            <div
              onClick={() => handleAddToCartClick(product)}
              className="w-full h-100 overflow-hidden cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-100 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* تفاصيل المنتج */}
            <div className="p-4 text-center">
              <h3 className="text-sm md:text-base font-semibold mb-2 line-clamp-2">
                {product.title}
              </h3>
              <div className="text-gray-400 line-through text-sm">
                EGP {product.oldPrice.toLocaleString()}
              </div>
              <div className="text-red-600 font-bold text-lg">
                EGP {product.price.toLocaleString()}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>


  {/* 🟢 New Swiper Section قبل الفوتر */}
<section className="py-12 bg-gray-50">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
    Featured Collections
  </h2>

  <div className="relative">
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="px-6"
    >
      {featuredProducts.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden relative group">
            {/* ❤️ Favorite */}
            <button
              onClick={() => addToFavorites(product)}
              className="absolute top-3 left-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition z-10"
            >
              <Heart className="w-5 h-5 text-black" />
            </button>

            {/* 🛒 Cart */}
            <button
              onClick={() => handleAddToCartClick(product)}
              className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition z-10"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
            </button>

            {/* Product Image */}
            <div
              onClick={() => handleAddToCartClick(product)}
              className="w-full h-100 overflow-hidden cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-100 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-sm md:text-base font-semibold mb-2 line-clamp-2">
                {product.title}
              </h3>
              {product.oldPrice && (
                <div className="text-gray-400 line-through text-sm">
                  EGP {product.oldPrice.toLocaleString()}
                </div>
              )}
              <div className="text-red-600 font-bold text-lg">
                EGP {product.price.toLocaleString()}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>
{/* 🟢 Grid Section after Featured Swiper */}
<section className="py-12 mt-10 bg-gray-50">
  <h2 className="text-2xl md:text-3xl font-bold text-center  mb-8 text-gray-900">
    Explore More Cases
  </h2>

  
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 px-6">
  
    {morecases.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-3xl  shadow-md hover:shadow-xl transition overflow-hidden relative group cursor-pointer"
      >
        {/* Image */}
        <div className="w-full mt-5 mb-5 aspect-[3/4] flex items-center justify-center bg-gray-100 overflow-hidden rounded-2xl shadow-md"

>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
          <button
            onClick={() => addToFavorites(product)}
            className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
          >
            <Heart className="w-5 h-5 text-red-500" />
          </button>
          <button
            onClick={() => handleAddToCartClick(product)}
            className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
          >
            <ShoppingBag className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 text-center">
          <h3 className="text-base font-semibold mb-2 line-clamp-2">
            {product.title || product.name}
          </h3>
          {product.oldPrice && (
            <div className="text-gray-400 line-through text-sm mb-1">
              EGP {product.oldPrice.toLocaleString()}
            </div>
          )}
          <div className="text-red-600 font-bold text-lg">
            EGP {product.price.toLocaleString()}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

</div>


      {/* Image Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setModalProduct(null)}
              className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 flex flex-col items-center">
              <img
                src={modalProduct.image}
                alt={modalProduct.name}
                className="w-60 h-60 object-contain mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{modalProduct.name}</h3>
              <p className="text-gray-600 text-lg mb-4">
                {modalProduct.price} EGP
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => {
                    addToFavorites(modalProduct);
                    setModalProduct(null);
                  }}
                  className="flex-1 border-2 border-pink-500 text-pink-500 py-2 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition"
                >
                  Add to Favourites
                </button>
                <button
                  onClick={() => {
                    handleAddToCartClick(modalProduct);
                    setModalProduct(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black font-semibold py-2 rounded-lg shadow-md hover:scale-105 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {drawerOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* خلفية سوداء شفافة */}
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
              className="bg-white w-96 h-full p-6 shadow-2xl fixed right-0 top-0 flex flex-col overflow-y-auto pl-10"
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
                <h3 className="text-lg font-semibold">
                  {selectedProduct.name }
                </h3>
                <p className="text-gray-600">{selectedProduct.price} EGP</p>
              </div>

              <h2 className="text-xl font-bold mb-5 text-gray-800">
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
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 shadow-md  focus:ring-2  transition-all outline-none"
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
  );
};

export default Home;
