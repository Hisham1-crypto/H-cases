// Laptopsleeve.jsx
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const products = [
  {
    id: 1,
    name: "Lazy Black Cat Laptop Sleeve",
    image: "/laptopsleeve/photo_1_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 2,
    name: "Black - White Laptop Sleeve",
    image: "/laptopsleeve/photo_2_2025-10-14_15-29-33.jpg",
    price: 450,
  },
  {
    id: 3,
    name: "Blue Pulse Laptop Sleeve",
    image: "/laptopsleeve/photo_3_2025-10-14_15-29-33.jpg",
    price: 450,
  },
    {
    id: 4,
    name: "Colored Flowers Laptop Sleeve",
    image: "/laptopsleeve/photo_4_2025-10-14_15-29-33.jpg",
    price: 450,
  },
      {
    id: 5,
    name: "Black Laptop Sleeve",
    image: "/laptopsleeve/photo_5_2025-10-14_15-29-33.jpg",
    price: 450,
  },
      {
    id: 6,
    name: "White Evile Eye Laptop Sleeve",
    image: "/laptopsleeve/photo_6_2025-10-14_15-29-33.jpg",
    price: 450,
  },  
    {
    id: 7,
    name: "Yellow Flowers Laptop Sleeve",
    image: "/laptopsleeve/photo_7_2025-10-14_15-29-33.jpg",
    price: 450,
  },
    {
    id: 8,
    name: "Neon Evile Eye Laptop Sleeve",
    image: "/laptopsleeve/photo_8_2025-10-14_15-29-33.jpg",
    price: 450,
  },
    {
    id: 9,
    name: "Desktop Error Laptop Sleeve",
    image: "/laptopsleeve/photo_9_2025-10-14_15-29-33.jpg",
    price: 450,
  },
    {
    id: 10,
    name: "Dark Laptop Sleeve",
    image: "/laptopsleeve/photo_10_2025-10-14_15-29-33.jpg",
    price: 450,
  },
    {
    id: 11,
    name: "Blue Porsche Laptop Sleeve",
    image: "/laptopsleeve/photo_11_2025-10-14_15-29-33.jpg",
    price: 450,
  },
];

const Laptopsleeve = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-20"><NavBar/></div>
      <div className="h-20"></div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-20">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative border rounded-lg overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => navigate(`/laptopsleeve/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay buttons on hover */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"> */}
            {/* <button
              className="bg-white p-2 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added ${product.name} to Favorites`);
              }}
            >
              <Heart className="text-red-500" />
            </button> */}
            {/* <button
              className="bg-white p-2 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added ${product.name} to Cart`);
              }}
            >
              <ShoppingBag />
            </button> */}
          {/* </div> */}
          <div className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="mt-1 font-bold">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Laptopsleeve;
