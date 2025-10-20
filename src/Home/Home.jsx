import React, { useContext, useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import { FavoritesContext } from "../FavoritesProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Eye } from "lucide-react";
import Footerr from "../Footerr/Footerr";

// Products
const featuredProducts = [
  {
    id: 26,
    title: "LV",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_8_2025-10-10_07-18-14.jpg",
  },
  {
    id: 27,
    title: "Special Evile Eye",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg",
  },
  {
    id: 25,
    title: "Blue Vibes Mini Bag",
    image: "/minibag/photo_8_2025-10-14_18-49-08.jpg",
    price: 400,
    oldPrice: 500,
  },
  {
    id: 28,
    title: "Green Power Puff",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_17_2025-10-10_07-18-14.jpg",
  },
  {
    id: 29,
    title: "Blue Power Puff",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_18_2025-10-10_07-18-14.jpg",
  },
  {
    id: 30,
    title: "Red Power Puff",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_19_2025-10-10_07-18-14.jpg",
  },
  {
    id: 31,
    title: "Dark militairy babe shark",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_9_2025-09-29_20-49-37.jpg",
  },
  {
    id: 32,
    title: "Black LV",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_9_2025-10-10_07-18-14.jpg",
  },
  {
    id: 34,
    title: "White militairy babe shark",
    price: 130,
    oldPrice: 180,
    image: "/top pick photos/photo_10_2025-09-29_20-49-37.jpg",
  },
  {
    id: 35,
    title: "Brown LV",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_10_2025-10-10_07-18-14.jpg",
  },
  {
    id: 36,
    title: "Sky Evile Eye",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_11_2025-10-10_07-18-14.jpg",
  },
  {
    id: 37,
    title: "Blue Evile Eye",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_12_2025-10-10_07-18-14.jpg",
  },
  {
    id: 38,
    title: "Pink Evile Eye",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_13_2025-10-10_07-18-14.jpg",
  },
  {
    id: 39,
    title: "Black Evile Eye",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_14_2025-10-10_07-18-14.jpg",
  },
  {
    id: 40,
    title: "Special Evile Eye",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_15_2025-10-10_07-18-14.jpg",
  },
  {
    id: 41,
    title: "Special Evile Eye",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg",
  },
  {
    id: 42,
    title: "Pink 911",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_20_2025-10-10_07-18-14.jpg",
  },
  {
    id: 43,
    title: "Pink GT3",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_21_2025-10-10_07-18-14.jpg",
  },
  {
    id: 44,
    title: "Pink Porsche 911",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_22_2025-10-10_07-18-14.jpg",
  },
  {
    id: 45,
    title: "White 911",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_23_2025-10-10_07-18-14.jpg",
  },
];

const morecases = [
  {
    id: 1,
    name: "Lazy Black Cat Laptop Sleeve",
    image: "/laptopsleeve/photo_1_2025-10-14_15-29-33.jpg",
    price: 450,
    oldPrice: 550,
  },

  {
    id: 8,
    name: "Neon Evile Eye Laptop Sleeve",
    image: "/laptopsleeve/photo_8_2025-10-14_15-29-33.jpg",
    price: 450,
    oldPrice: 550,
  },
  {
    id: 9,
    name: "Desktop Error Laptop Sleeve",
    image: "/laptopsleeve/photo_9_2025-10-14_15-29-33.jpg",
    price: 450,
    oldPrice: 550,
  },

  {
    id: 11,
    name: "Blue Porsche Laptop Sleeve",
    image: "/laptopsleeve/photo_11_2025-10-14_15-29-33.jpg",
    price: 450,
    oldPrice: 550,
  },
  {
    id: 46,
    title: "Grey 911",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_24_2025-10-10_07-18-14.jpg",
  },
  {
    id: 47,
    title: "Bronze 911",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_25_2025-10-10_07-18-14.jpg",
  },
  {
    id: 48,
    title: "Red 911",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_26_2025-10-10_07-18-14.jpg",
  },
  {
    id: 18,
    name: "Deep Ocean Mini Bag",
    image: "/minibag/photo_1_2025-10-14_18-49-08.jpg",
    price: 400,
    oldPrice: 500,
  },
  {
    id: 23,
    name: "Wild Berry Mini Bag",
    image: "/minibag/photo_6_2025-10-14_18-49-08.jpg",
    price: 400,
    oldPrice: 500,
  },
  {
    id: 24,
    name: "Fashion Girl Mini Bag",
    image: "/minibag/photo_7_2025-10-14_18-49-08.jpg",
    price: 400,
    oldPrice: 500,
  },
  {
    id: 21,
    name: "Color Pop Mini Bag",
    image: "/minibag/photo_4_2025-10-14_18-49-08.jpg",
    price: 400,
    oldPrice: 500,
  },
  {
    id: 49,
    title: "Lufi",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_27_2025-10-10_07-18-14.jpg",
  },
  {
    id: 50,
    title: "Lufi",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_28_2025-10-10_07-18-14.jpg",
  },
  {
    id: 51,
    title: "Pink Labubu",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_34_2025-10-10_07-18-14.jpg",
  },
  {
    id: 12,
    name: "Street Art Fanny Pack",
    image: "/funny bag/photo_1_2025-10-14_18-15-04.jpg",
    price: 450,
    oldPrice: 500,
  },

  {
    id: 52,
    title: "Blue Labubu ",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_35_2025-10-10_07-18-14.jpg",
  },
  {
    id: 53,
    title: "Brown Labubu",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_36_2025-10-10_07-18-14.jpg",
  },
  {
    id: 13,
    name: "Blue Pulse Fanny Pack",
    image: "/funny bag/photo_2_2025-10-14_18-15-04.jpg",
    price: 450,
    oldPrice: 500,
  },
  {
    id: 17,
    name: "Neon Evile Eye Fanny Pack",
    image: "/funny bag/photo_6_2025-10-14_18-15-04.jpg",
    price: 450,
    oldPrice: 500,
  },

  {
    id: 54,
    title: "Dark Brown Labubu",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_37_2025-10-10_07-18-14.jpg",
  },
  {
    id: 55,
    title: "Light Pink Labubu",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_38_2025-10-10_07-18-14.jpg",
  },
  {
    id: 56,
    title: "Angry Pink Labubu ",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_39_2025-10-10_07-18-14.jpg",
  },
  {
    id: 57,
    title: "Lufi",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_29_2025-10-10_07-18-14.jpg",
  },
  {
    id: 58,
    title: "Lufi ",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_30_2025-10-10_07-18-14.jpg",
  },
  {
    id: 59,
    title: "Lufi",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_31_2025-10-10_07-18-14.jpg",
  },
  {
    id: 60,
    title: "Lufi",
    price: 130,
    oldPrice: 160,
    image: "/top pick photos/photo_32_2025-10-10_07-18-14.jpg",
  },
];

const products2 = [
  {
    id: 61,
    title: "Red Babe Shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_1_2025-09-29_20-49-37.jpg",
  },

  {
    id: 23,
    oldPrice: 500,
    title: "Wild Berry Mini Bag",
    image: "/minibag/photo_6_2025-10-14_18-49-08.jpg",
    price: 400,
  },
  {
    id: 63,
    title: "Blue - Muve babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-09-29_20-49-37.jpg",
  },
  {
    id: 19,
    title: "Graffiti Vibe Mini Bag",
    oldPrice: 500,
    image: "/minibag/photo_2_2025-10-14_18-49-08.jpg",
    price: 400,
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
    id: 72,
    title: "Black - white LV",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_7_2025-10-10_07-18-14.jpg",
  },
];

const laptopsleeve = [
  {
    id: 1,
    title: "Laptop Sleeve 13 inch",
    oldPrice: 550,

    image: "/laptopsleeve/photo_1_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 2,
    title: "Black - White Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_2_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 3,
    title: "Blue Pulse Laptop Sleeve",
    oldPrice: 500,
    image: "/laptopsleeve/photo_3_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 4,
    title: "Colored Flowers Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_4_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 5,
    title: "Black Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_5_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 6,
    title: "White Evile Eye Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_6_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 7,
    title: "Yellow Flowers Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_7_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 8,
    title: "Neon Evile Eye Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_8_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 9,
    title: "Desktop Error Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_9_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 10,
    title: "Dark Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_10_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 11,
    title: "Blue Porsche Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_11_2025-10-14_15-29-33.jpg",
    price: 450,
  },
];
const firstgrid = [
  {
    id: 40,
    title: "Special Evile Eye",
    oldPrice: 160,
    image: "/evileeye/photo_5_2025-10-10_17-14-24.jpg",
    price: 130,
  },
  {
    id: 13,
    title: "Street Art Fanny Pack",
    oldPrice: 500,
    image: "/funny bag/photo_2_2025-10-14_18-15-04.jpg",
    price: 450,
  },
  {
    id: 2,
    title: "Black - White Laptop Sleeve",
    oldPrice: 550,
    image: "/laptopsleeve/photo_2_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 20,
    oldPrice: 500,
    name: "Black - White Mini Bag",
    image: "/minibag/photo_3_2025-10-14_18-49-08.jpg",
    price: 400,
  },
  {
    id: 22,
    name: "Retro Pop Mini Bag",
    oldPrice: 500,
    image: "/minibag/photo_5_2025-10-14_18-49-08.jpg",
    price: 400,
  },
  {
    id: 14,
    name: "Color Pop Fanny Pack",
    oldPrice: 500,
    image: "/funny bag/photo_3_2025-10-14_18-15-04.jpg",
    price: 450,
  },
  {
    id: 73,
    title: "Purple - mint babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_8_2025-09-29_20-49-37.jpg",
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
    id: 68,
    title: "Brown tiger",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_5_2025-10-10_07-18-14.jpg",
  },
  {
    id: 64,
    title: "Black  Tiger case",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-10-10_07-18-14.jpg",
  },
];
// Phone Brands & Models
const phoneData = {
  iPhone: ["iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 14", "iPhone 13"],
  Samsung: ["Samsung S23", "Samsung S22", "Samsung A72"],
  Xiaomi: ["Xiaomi 13", "Xiaomi 12", "Xiaomi Note 11"],
};

const Home = () => {
  const { addToFavorites } = useContext(FavoritesContext);
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    // نتحقق هل المستخدم شاف الرسالة في نفس الجلسة دي
    const hasSeenPopup = sessionStorage.getItem("hasSeenFreeShippingPopup");

    // لو أول مرة يفتح الصفحة في الجلسة دي
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenFreeShippingPopup", "true"); // نخزن أنه شافها في الجلسة الحالية فقط
    }
  }, []);
  // فلترة المنتجات كلها بناءً على السيرش
  const filteredFirstGrid = firstgrid.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts2 = products2.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFeatured = featuredProducts.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMoreCases = morecases.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLaptopSleeve = laptopsleeve.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modal state

  // 🟡 Add to Cart Click
  const handleAddToCartClick = (product) => {
    // لو المنتج فيه title بس، نخليه name عشان الدروير يشتغل صح
    setSelectedProduct({ ...product, name: product.name || product.title });
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen text-gray-900">
      {/* Navbar */}
      <div className="mb-20">
        <NavBar onSearch={setSearchQuery} />
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-[90%] sm:w-[400px] text-center relative animate-slide-up">
            {/* زر الإغلاق */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* المحتوى */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              🎉 Free Shipping Alert!
            </h2>
            <p className="text-gray-600 mb-5 text-sm sm:text-base">
              Any order above{" "}
              <span className="font-bold text-[#56cfe1]">500 EGP</span> gets
              free shipping.
            </p>

            {/* الأزرار */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
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
              style={{ backgroundImage: "url('/slide photo1.jpg')" }}
            >
              <div className="bg-black/40 w-full h-full absolute inset-0" />
              <div className="relative z-10 max-w-2xl px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Discover a case that describes your personality
                </h1>
                <p className="text-lg text-gray-100 mb-6">
                  Best materials - Exclusive designs - Fast delivery to all
                  provinces
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
  "
              style={{ backgroundImage: "url('/slide  photo2.jpg')" }}
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
          {/* 🟤 Phone Cover (Big One) */}
          <div
            className="relative group rounded-3xl overflow-hidden md:row-span-2 h-100 md:col-span-1 col-span-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/phone cover.jpg"
              alt="Phone Cover"
              className="w-full h-[215px] sm:h-[350px] md:h-[400px] lg:h-[590px] object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
            <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg text-center px-2">
              Phone Cover
            </h3>
          </div>

          {/* 🟡 Mini bag */}
          <div
            className="relative group rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => navigate("/minibag")}
          >
            <img
              src="/minibag category.jpg"
              alt="Mini Bags"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
            <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
              Mini Bags
            </h3>
          </div>

          {/* 🟢 Funny Bags */}
          <div
            className="relative group rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => navigate("/funnybag")}
          >
            <img
              src="/funnybag category.jpg"
              alt="Funny Bags"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
            <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg text-center px-2">
              Fanny Packs
            </h3>
          </div>

          {/* 🔵 Laptop Sleeves */}
          <div
            className="relative group rounded-3xl overflow-hidden col-span-2 md:col-span-1 cursor-pointer"
            onClick={() => navigate("/laptopsleeve")}
          >
            <img
              src="/laptopsleeves category.jpg"
              alt="Laptop Sleeves"
              className="w-full h-100 sm:pr-10 sm:pl-10  object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
            <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold drop-shadow-lg text-center">
              Laptop Sleeves
            </h3>
          </div>
        </div>
      </section>
      <h2 className="text-2xl md:text-3xl font-bold text-center  mb-8 text-gray-900">
        Special Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 px-6">
        {filteredFirstGrid.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl  shadow-md hover:shadow-xl transition overflow-hidden relative group cursor-pointer"
          >
            {/* Image */}
            <div className="w-full  mb-5 aspect-[3/4] flex items-center justify-center bg-gray-100 overflow-hidden rounded-2xl shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
              {/* الزر بتاع القلب */}
              <button
                onClick={() => addToFavorites(product)}
                className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
              >
                <Heart className="w-5 h-5 text-red-500" />
              </button>

              {/* الزر بتاع العين */}
              <button
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
                }}
                className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
              >
                <Eye className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            {/* Product Info */}
            <div
              className="p-4 text-center"
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
              }}
            >
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
              {filteredProducts2.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="bg-white py-12 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden relative group">
                    {/* ❤️ فيفوريت */}
                    <button
                      onClick={() => addToFavorites(product)}
                      className="absolute top-3 left-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition z-10"
                    >
                      <Heart className="w-5 h-5 text-black" />
                    </button>

                    {/* زرار العين */}
                    <button
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
                      }}
                      className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full shadow hover:bg-black hover:text-white hover:scale-110 transition z-10 flex items-center gap-1"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {/* صورة المنتج */}
                    <div
                      // onClick={() => handleAddToCartClick(product)}
                      className="w-full h-100 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-100 object-cover hover:scale-110 transition-transform duration-500"
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
                        }}
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
              {filteredFeatured.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden relative group">
                    {/* ❤️ Favorite */}
                    <button
                      onClick={() => addToFavorites(product)}
                      className="absolute top-3 left-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition z-10"
                    >
                      <Heart className="w-5 h-5 text-black" />
                    </button>

                    {/* 🛒 زرار العين */}
                    <button
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
                      }}
                      className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full shadow hover:bg-black hover:text-white hover:scale-110 transition z-10 flex items-center gap-1"
                    >
                      <Eye className="w-5 h-5" />
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
                        }}
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
            {filteredMoreCases.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl  shadow-md hover:shadow-xl transition overflow-hidden relative group cursor-pointer"
              >
                {/* Image */}
                <div className="w-full mt-5 mb-5 aspect-[3/4] flex items-center justify-center bg-gray-100 overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    }}
                  />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                  {/* الزر بتاع القلب */}
                  <button
                    onClick={() => addToFavorites(product)}
                    className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>

                  {/* الزر بتاع العين */}
                  <button
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
                    }}
                    className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
                  >
                    <Eye className="w-5 h-5 text-gray-800" />
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
          <section className="py-12 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
              Laptop Sleeves
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
                {filteredLaptopSleeve.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="bg-white py-12 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden relative group">
                      {/* ❤️ فيفوريت */}
                      <button
                        onClick={() => addToFavorites(product)}
                        className="absolute top-3 left-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition z-10"
                      >
                        <Heart className="w-5 h-5 text-black" />
                      </button>

                      {/* زرار العين */}
                      <button
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
                        }}
                        className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full shadow hover:bg-black hover:text-white hover:scale-110 transition z-10 flex items-center gap-1"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* صورة المنتج */}
                      <div
                        // onClick={() => handleAddToCartClick(product)}
                        className="w-full h-100 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-100 object-cover hover:scale-110 transition-transform duration-500"
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
                          }}
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
        </section>
        <div>
          <Footerr />
        </div>
      </div>
    </div>
  );
};

export default Home;
