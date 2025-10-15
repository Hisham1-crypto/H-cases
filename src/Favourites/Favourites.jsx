import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { Trash, X, Heart } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Eye } from "lucide-react"
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

      {/* 🩶 Footer */}
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

export default Favorites;
