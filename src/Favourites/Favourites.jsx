import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { Trash, X, Heart } from "lucide-react";
import NavBar from "../NavBar/NavBar";

import { Eye } from "lucide-react"
import Footerr from "../Footerr/Footerr";
const products = [
  {
    id: 1,
    name: "Laptop Sleeve 13 inch",
    image: "/laptopsleeve/photo_1_2025-10-14_15-29-33.jpg",
    price: 200,
  },
  {
    id: 2,
    name: "Laptop Sleeve 15 inch",
    image: "/laptopsleeve/photo_2_2025-10-14_15-29-33.jpg",
    price: 250,
  },
  {
    id: 3,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_3_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 4,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_4_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 5,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_5_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 6,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_6_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 7,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_7_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 8,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_8_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 9,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_9_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 10,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_10_2025-10-14_15-29-33.jpg",
    price: 300,
  },
  {
    id: 11,
    name: "Laptop Sleeve 17 inch",
    image: "/laptopsleeve/photo_11_2025-10-14_15-29-33.jpg",
    price: 300,
  }, {
    id: 12,
    name: "funny bag",
    image: "/funny bag/photo_1_2025-10-14_18-15-04.jpg",
    price: 200,
  },
  {
    id: 13,
    name: "funny bag",
    image: "/funny bag/photo_2_2025-10-14_18-15-04.jpg",
    price: 250,
  },
  {
    id: 14,
    name: "funny bag",
    image: "/funny bag/photo_3_2025-10-14_18-15-04.jpg",
    price: 300,
  },
    {
    id: 15,
    name: "funny bag",
    image: "/funny bag/photo_4_2025-10-14_18-15-04.jpg",
    price: 300,
  },
      {
    id: 16,
    name: "funny bag",
    image: "/funny bag/photo_5_2025-10-14_18-15-04.jpg",
    price: 300,
  },
      {
    id: 17,
    name: "funny bag",
    image: "/funny bag/photo_6_2025-10-14_18-15-04.jpg",
    price: 300,
  },  {
    id: 18,
    name: "mini bag",
    image: "/minibag/photo_1_2025-10-14_18-49-08.jpg",
    price: 200,
  },
  {
    id: 19,
    name: "mini bag",
    image: "/minibag/photo_2_2025-10-14_18-49-08.jpg",
    price: 250,
  },
  {
    id: 20,
    name: "mini bag",
    image: "/minibag/photo_3_2025-10-14_18-49-08.jpg",
    price: 300,
  },
    {
    id: 21,
    name: "mini bag",
    image: "/minibag/photo_4_2025-10-14_18-49-08.jpg",
    price: 300,
  },
      {
    id: 22,
    name: "mini bag",
    image: "/minibag/photo_5_2025-10-14_18-49-08.jpg",
    price: 300,
  },
      {
    id: 23,
    name: "mini bag",
    image: "/minibag/photo_6_2025-10-14_18-49-08.jpg",
    price: 300,
  },  
       {
    id: 24,
    name: "mini bag",
    image: "/minibag/photo_7_2025-10-14_18-49-08.jpg",
    price: 300,
  },  
       {
    id: 25,
    name: "mini bag",
    image: "/minibag/photo_8_2025-10-14_18-49-08.jpg",
    price: 300,
  },  
     { id: 26, name: "LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_8_2025-10-10_07-18-14.jpg" },
    { id: 27, name: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg" },
  { id: 28, name: "Green Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_17_2025-10-10_07-18-14.jpg" },
  { id: 29, name: "Blue Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_18_2025-10-10_07-18-14.jpg" },
  { id: 30, name: "Red Power Puff", price: 130, oldPrice: 160, image: "/top pick photos/photo_19_2025-10-10_07-18-14.jpg" },
  { id: 31, name: "Dark militairy babe shark", price: 130, oldPrice: 160, image: "/top pick photos/photo_9_2025-09-29_20-49-37.jpg" },
  { id: 32, name: "Black LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_9_2025-10-10_07-18-14.jpg" },
  { id: 34, name: "White militairy babe shark", price: 130, oldPrice: 180, image: "/top pick photos/photo_10_2025-09-29_20-49-37.jpg" },
  { id: 35, name: "Brown LV", price: 130, oldPrice: 160, image: "/top pick photos/photo_10_2025-10-10_07-18-14.jpg" },
  { id: 36, name: "Sky Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_11_2025-10-10_07-18-14.jpg" },
  { id: 37, name: "Blue Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_12_2025-10-10_07-18-14.jpg" },
  { id: 38, name: "Pink Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_13_2025-10-10_07-18-14.jpg" },
  { id: 39, name: "Black Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_14_2025-10-10_07-18-14.jpg" },
  { id: 40, name: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_15_2025-10-10_07-18-14.jpg" },
  { id: 41, name: "Special Evile Eye", price: 130, oldPrice: 160, image: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg" },
  { id: 42, name: "Pink 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_20_2025-10-10_07-18-14.jpg" },
  { id: 43, name: "Pink GT3", price: 130, oldPrice: 160, image: "/top pick photos/photo_21_2025-10-10_07-18-14.jpg" },
  { id: 44, name: "Pink Porsche 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_22_2025-10-10_07-18-14.jpg" },
  { id: 45, name: "White 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_23_2025-10-10_07-18-14.jpg" },
 
   { id: 46, name: "Grey 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_24_2025-10-10_07-18-14.jpg" },
  { id: 47, name: "Bronze 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_25_2025-10-10_07-18-14.jpg" },
  { id: 48, name: "Red 911", price: 130, oldPrice: 160, image: "/top pick photos/photo_26_2025-10-10_07-18-14.jpg" },
  { id: 49, name: "Lufi", price: 130, oldPrice: 180, image: "/top pick photos/photo_27_2025-10-10_07-18-14.jpg" },
  { id: 50, name: "Lufi", price: 130, oldPrice: 180, image: "/top pick photos/photo_28_2025-10-10_07-18-14.jpg" },
  { id: 51, name: "Pink Labubu", price: 130, oldPrice: 180, image: "/top pick photos/photo_34_2025-10-10_07-18-14.jpg" },
  { id: 52, name: "Blue Labubu ", price: 130, oldPrice: 160, image: "/top pick photos/photo_35_2025-10-10_07-18-14.jpg" },
  { id: 53, name: "Brown Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_36_2025-10-10_07-18-14.jpg" },
  { id: 54, name: "Dark Brown Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_37_2025-10-10_07-18-14.jpg" },
  { id: 55, name: "Light Pink Labubu", price: 130, oldPrice: 160, image: "/top pick photos/photo_38_2025-10-10_07-18-14.jpg" },
  { id: 56, name: "Angry Pink Labubu ", price: 130, oldPrice: 160, image: "/top pick photos/photo_39_2025-10-10_07-18-14.jpg" },
  { id: 57, name: "Lufi", price: 130, oldPrice: 160, image: "/top pick photos/photo_29_2025-10-10_07-18-14.jpg" },
  { id: 58, name: "Lufi ", price: 130, oldPrice: 160, image: "/top pick photos/photo_30_2025-10-10_07-18-14.jpg" },
  { id: 59, name: "Lufi", price: 130, oldPrice: 160, image: "/top pick photos/photo_31_2025-10-10_07-18-14.jpg" },
  { id: 60, name: "Lufu", price: 130, oldPrice: 160, image: "/top pick photos/photo_32_2025-10-10_07-18-14.jpg" },

{
    id: 61,
    name: "Red Babe Shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_1_2025-09-29_20-49-37.jpg",
  },
      { src: "/babesharkcase/shark9.jpg",
      id: 111,   
      oldPrice: 160,
      name: "Pink babe shark" ,
      price: 130 },
          {
      id:112 ,
      src: "/babesharkcase/shark4.jpg",
      name: "White military babe shark" ,
      price: 130,
      oldPrice: 160,

    },
    {
    id: 62,
    name: "Tiger Case",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_1_2025-10-10_07-18-14.jpg",
  },
  
  {
    id: 63,
    name: "Blue - Purple babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-09-29_20-49-37.jpg",
  },
  {
    id: 64,
    name: "Black  Tiger case",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_2_2025-10-10_07-18-14.jpg",
  },
  {
    id: 65,
    name: "Militairy - black babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_3_2025-09-29_20-49-37.jpg",
  },
    {
    id: 66,
    name: "Red - black babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_4_2025-09-29_20-49-37.jpg",
  },
     {
    id: 67,
    name: "Pink - blue babe  shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_5_2025-09-29_20-49-37.jpg",
  },
     {
    id: 68,
    name: "Brown tiger",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_5_2025-10-10_07-18-14.jpg",
  },
       {
    id: 69,
    name: "Dark militairy - black babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_6_2025-09-29_20-49-37.jpg",
  },
        {
    id: 70,
    name: "Blue LV",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_6_2025-10-10_07-18-14.jpg",
  },
          {
    id: 71,
    name: "Black babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_7_2025-09-29_20-49-37.jpg",
  },
           {
    id: 72,
    name: "Black - white LV",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_7_2025-10-10_07-18-14.jpg",
  },
             {
    id: 73,
    name: "Purple - mint babe shark",
    oldPrice: 160,
    price: 130,
    image: "/top pick photos/photo_8_2025-09-29_20-49-37.jpg",
  },
    {
    id: 62,
    name: "Tiger Case",
    oldPrice: 160,
    price: 130,
    src: "/top pick photos/photo_1_2025-10-10_07-18-14.jpg",
  },    {
    id: 68,
    name: "Brown tiger",
    oldPrice: 160,
    price: 130,
    src: "/top pick photos/photo_5_2025-10-10_07-18-14.jpg",
  },
    { 
      id:113,
      src: "/tigercase/tiger3.jpg",
      name:"Cheetah 2 case",
      oldPrice: 160,
      price: 130 },

  {id:114, src: "/tigercase/tiger4.jpg",    oldPrice: 160,
 name:"Brown tiger case", price: 130 },
  {
    id: 64,
    name: "Black  Tiger case",
    oldPrice: 160,
    price: 130,
    src: "/top pick photos/photo_2_2025-10-10_07-18-14.jpg",
  },

];
const Favorites = () => {
  const { addToCart } = useContext(CartContext);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  return (
    <div className="mb-20">
      <NavBar />
      <div className="h-20"></div>
      <div className="mt-20 min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto p-6 rounded-2xl">
          {/* 🩶 العنوان */}
          {/* <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center flex justify-center">
            Your Wishlist <Heart className="m-1 text-pink-500" />
          </h1> */}

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <Heart className="w-48 h-48 text-gray-300" strokeWidth={1.1} />
                <X
                  className="w-20 h-20 text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
                  strokeWidth={2}
                />
              </div>
              <h1 className="text-black text-center text-4xl font-bold mt-8">
                Wishlist is empty.
              </h1>
              <div className="text-gray-600 leading-relaxed mt-7 text-center">
                <p>You don't have any products in the wishlist yet.</p>
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
                  className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition bg-gray-50 cursor-pointer relative"
                  // onClick={() => navigate(`/product/${item.id}`)}
                >
                  {/* 🗑️ زر الحذف */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // يمنع الانتقال عند الضغط على الحذف
                      removeFromFavorites(item.id);
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
                    title="Remove from favorites"
                  >
                    <Trash size={20} />
                  </button>

                  {/* 🖼️ صورة المنتج */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-contain mb-3 rounded-lg"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 font-medium mb-2">
                    {item.price} EGP
                  </p>

                  {/* ⚫ زر التفاصيل */}
                  <button
  onClick={(e) => {
    e.stopPropagation();
    if (item.id >= 1 && item.id <= 11) {
      navigate(`/laptopsleeve/${item.id}`);
    } else if (item.id >= 12 && item.id <= 17) {
      navigate(`/funnybagdetails/${item.id}`);
    } else if (item.id >= 18 && item.id <= 25) {
      navigate(`/minibagdetails/${item.id}`);
    } else {
      navigate(`/phonedetails/${item.id}`);
    }
  }}
  className="group relative w-full bg-black text-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300"
> <span className="transition-all duration-300 group-hover:pr-1">View Details</span>
  <Eye
    className="opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
    size={18}
  />
                
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

         <div><Footerr /></div>
   
    </div>
  );
};

export default Favorites;
