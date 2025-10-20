// Laptopsleeve.jsx
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footerr from "../Footerr/Footerr";

const products =  [
 {
    id: 12,
    name: "Street Art Fanny Pack",
    image: "/funny bag/photo_1_2025-10-14_18-15-04.jpg",
    price: 450,
  },
  {
    id: 13,
    name: "Blue Pulse Fanny Pack",
    image: "/funny bag/photo_2_2025-10-14_18-15-04.jpg",
    price: 450,
  },
  {
    id: 14,
    name: "Color Pop Fanny Pack",
    image: "/funny bag/photo_3_2025-10-14_18-15-04.jpg",
    price: 450,
  },
    {
    id: 15,
    name: "Smoke Splash Fanny Pack",
    image: "/funny bag/photo_4_2025-10-14_18-15-04.jpg",
    price: 450,
  },
      {
    id: 16,
    name: "Black - White Fanny Pack",
    image: "/funny bag/photo_5_2025-10-14_18-15-04.jpg",
    price: 450,
  },
      {
    id: 17,
    name: "Neon Evile Eye Fanny Pack",
    image: "/funny bag/photo_6_2025-10-14_18-15-04.jpg",
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
          onClick={() => navigate(`/funnybagdetails/${product.id}`)}
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
          <div><Footerr/></div>
    
    </div>
  );
};

export default Laptopsleeve;
