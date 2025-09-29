// src/BabeShark/BabeShark.jsx
import React, { useContext, useState } from "react";
import { Heart, ShoppingBag, X } from "lucide-react";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

import {
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  Footer,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

// Phone types
const allPhoneTypes = [
  "iPhone 14", "iPhone 14 Pro", "iPhone 13", "iPhone 13 Pro",
  "iPhone 12", "iPhone 12 Pro", "Samsung S23", "Samsung S23 Ultra",
  "Samsung S22", "Samsung S22 Plus", "Samsung S21", "Samsung S21 Ultra",
  "Google Pixel 8", "Google Pixel 7",
];

// Provinces + shipping
const allProvinces = [
  { name: "Cairo", shipping: 60 }, { name: "Giza", shipping: 60 },
  { name: "Alexandria", shipping: 63 }, { name: "Beheira", shipping: 63 },
  { name: "Kafr El-Sheikh", shipping: 70 }, { name: "Damietta", shipping: 70 },
  { name: "Port Said", shipping: 70 }, { name: "Monufia", shipping: 70 },
  { name: "Qalyubia", shipping: 70 }, { name: "Gharbia", shipping: 70 },
  { name: "Sharqia", shipping: 70 }, { name: "Suez", shipping: 70 },
  { name: "Dakahlia", shipping: 70 }, { name: "Ismailia", shipping: 70 },
  { name: "Sohag", shipping: 81 }, { name: "Beni Suef", shipping: 81 },
  { name: "Minya", shipping: 81 }, { name: "Fayoum", shipping: 81 },
  { name: "Assiut", shipping: 81 }, { name: "Marsa Matrouh", shipping: 92 },
  { name: "Qena", shipping: 92 }, { name: "Red Sea", shipping: 92 },
  { name: "Luxor", shipping: 92 }, { name: "Aswan", shipping: 92 },
  { name: "North Coast", shipping: 95 }, { name: "South Sinai", shipping: 110 },
  { name: "New Valley", shipping: 110 }, { name: "North Sinai", shipping: 110 },
  { name: "Other", shipping: 100 },
];

// BabeShark images
const imagesPage1 = [
  "/babesharkcase/shark1.jpg",
  "/babesharkcase/shark2.jpg",
  "/babesharkcase/shark3.jpg",
  "/babesharkcase/shark4.jpg",
  "/babesharkcase/shark5.jpg",
];

const imagesPage2 = [
  "/babesharkcase/shark6.jpg",
  "/babesharkcase/shark7.jpg",
  "/babesharkcase/shark8.jpg",
  "/babesharkcase/shark9.jpg",
  "/babesharkcase/shark10.jpg",
];

const BabeShark = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPhoneType, setSelectedPhoneType] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const currentImages = currentPage === 1 ? imagesPage1 : imagesPage2;

  const handleAddToCartClick = (img) => {
    if (!user) {
      alert("You must log in first to add products to the cart.");
      navigate("/login");
      return;
    }
    setSelectedImage(img);
    // ❌ مش هنمسح القيم الموجودة
    // setSelectedPhoneType("");
    // setSelectedProvince("");
    // setAddress("");
    // setPhone("");
  };

const handleConfirmOrder = () => {
  const phoneTrimmed = phone.trim();
  const phoneTypeTrimmed = selectedPhoneType.trim();
  const provinceTrimmed = selectedProvince.trim();
  const addressTrimmed = address.trim();

  if (!phoneTrimmed) return alert("Please enter your phone number.");
  if (!/^\d+$/.test(phoneTrimmed) || phoneTrimmed.length !== 11)
    return alert("Invalid phone number. Must be 11 digits.");
  if (!phoneTypeTrimmed) return alert("Please choose your phone model.");
  if (!provinceTrimmed) return alert("Please choose your province.");
  if (!addressTrimmed) return alert("Please enter your address.");

    const provinceData = allProvinces.find((p) => p.name === selectedProvince);

    addToCart({
      name: "BabeShark Case",
      price: 200,
      image: selectedImage,
      phoneModel: selectedPhoneType,
      province: selectedProvince,
      shipping: provinceData?.shipping || 0,
      address,
      phone,
    });

    setSelectedImage(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen text-gray-900 font-sans">
      {/* Navbar */}
      <div className="mb-20">
        <NavBar />
      </div>
<div className="h-20"></div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          BabeShark Cases
        </h1>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentImages.map((img, idx) => (
            <div key={idx} className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              <img
                src={img}
                alt={`BabeShark ${idx + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage(img)}
              />

              {/* Cart & Favorite Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCartClick(img)}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ShoppingBag size={18} />
                </button>
                <button
                  onClick={() => addToFavorites({ name: "BabeShark Case", image: img, price: 200 })}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 mb-10 gap-3">
          {[1, 2].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Modal for Cart */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex flex-col items-center mb-4">
                <img src={selectedImage} alt="BabeShark Case" className="w-32 h-32 object-contain mb-3" />
                <h3 className="text-lg font-bold text-gray-900">BabeShark Case</h3>
                <p className="text-gray-600">200 EGP</p>
              </div>

              {/* Phone model */}
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Model</label>
              <select
                value={selectedPhoneType}
                onChange={(e) => setSelectedPhoneType(e.target.value)}
                className="w-full mb-4 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Choose phone model</option>
                {allPhoneTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              {/* Province */}
              <label className="block mb-2 text-sm font-medium text-gray-700">Province</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full mb-4 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Choose your province</option>
                {allProvinces.map((p) => (
                  <option key={p.name} value={p.name}>{p.name} (+{p.shipping} EGP)</option>
                ))}
              </select>

              {/* Address */}
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mb-4 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
              />

              {/* Phone */}
              <input
                type="text"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mb-6 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
              />

              <button
                onClick={handleConfirmOrder}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default BabeShark;
