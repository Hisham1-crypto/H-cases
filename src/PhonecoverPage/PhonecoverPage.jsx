import React, { useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Heart, ShoppingCart, X, Eye } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import Footerr from "../Footerr/Footerr";
import { FavoritesContext } from "../FavoritesProvider";
import { useNavigate } from "react-router-dom";

const sampleProducts = [
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

export default function PhonecoverPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleProducts.filter(
      (p) =>
        q === "" ||
        p.title.toLowerCase().includes(q)
    );
  }, [query]);

  const handleFavorite = (product) => {
    if (isFavorite(product.id)) removeFromFavorites(product.id);
    else addToFavorites(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 mb-20">
      <NavBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
        <div className="h-20"></div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-20 text-center">
          Phone Covers
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden relative"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-64 object-cover"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (p.id >= 1 && p.id <= 11) {
                          navigate(`/laptopsleeve/${p.id}`);
                        } else if (p.id >= 12 && p.id <= 17) {
                          navigate(`/funnybagdetails/${p.id}`);
                        } else if (p.id >= 18 && p.id <= 25) {
                          navigate(`/minibagdetails/${p.id}`);
                        } else {
                          navigate(`/phonedetails/${p.id}`);
                        }
                      }}
                />

                {/* Heart Button */}
                <button
                  onClick={() => handleFavorite(p)}
                  className="absolute top-3 left-3 bg-white/90 p-2 rounded-full shadow"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFavorite(p.id) ? "text-pink-500 fill-pink-500" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Eye Button */}
                <button
                  onClick={() => navigate(`/phonedetails/${p.id}`)}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow"
                >
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-800 truncate">
                  {p.title}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm font-bold text-gray-900">
                    {p.price} EGP
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-20">
              لا توجد نتائج مطابقة.
            </div>
          )}
        </div>
      </main>

      <Footerr />
    </div>
  );
}
