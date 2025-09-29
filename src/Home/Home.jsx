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
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  Footer,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// Phone types
const allPhoneTypes = [
  "iPhone 14",
  "iPhone 14 Pro",
  "iPhone 13",
  "iPhone 13 Pro",
  "iPhone 12",
  "iPhone 12 Pro",
  "Samsung S23",
  "Samsung S23 Ultra",
  "Samsung S22",
  "Samsung S22 Plus",
  "Samsung S21",
  "Samsung S21 Ultra",
  "Google Pixel 8",
  "Google Pixel 7",
];

// Provinces + shipping price
const allProvinces = [
  { name: "Cairo", shipping: 60 },
  { name: "Giza", shipping: 60 },
  { name: "Alexandria", shipping: 63 },
  { name: "Beheira", shipping: 63 },
  { name: "Kafr El-Sheikh", shipping: 70 },
  { name: "Damietta", shipping: 70 },
  { name: "Port Said", shipping: 70 },
  { name: "Monufia", shipping: 70 },
  { name: "Qalyubia", shipping: 70 },
  { name: "Gharbia", shipping: 70 },
  { name: "Sharqia", shipping: 70 },
  { name: "Suez", shipping: 70 },
  { name: "Dakahlia", shipping: 70 },
  { name: "Ismailia", shipping: 70 },
  { name: "Sohag", shipping: 81 },
  { name: "Beni Suef", shipping: 81 },
  { name: "Minya", shipping: 81 },
  { name: "Fayoum", shipping: 81 },
  { name: "Assiut", shipping: 81 },
  { name: "Marsa Matrouh", shipping: 92 },
  { name: "Qena", shipping: 92 },
  { name: "Red Sea", shipping: 92 },
  { name: "Luxor", shipping: 92 },
  { name: "Aswan", shipping: 92 },
  { name: "North Coast", shipping: 95 },
  { name: "South Sinai", shipping: 110 },
  { name: "New Valley", shipping: 110 },
  { name: "North Sinai", shipping: 110 },
  { name: "Other", shipping: 100 },
];

// Products
const products = [
  { id: 1, name: "Case - Abstract Orange", price: 150, image: "/case1.jpg" },
  { id: 2, name: "Case - Pink Minimal", price: 180, image: "/case2.jpg" },
  { id: 3, name: "Case - Black Marble", price: 200, image: "/case3.jpg" },
  { id: 4, name: "Case - Blue Galaxy", price: 220, image: "/case2.jpg" },
  { id: 5, name: "Case - White Marble", price: 190, image: "/case1.jpg" },
];

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPhoneType, setSelectedPhoneType] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Validation before opening modal
  const handleAddToCartFromCard = (product) => {
    if (!user) {
      alert("You must log in first to add products to the cart.");
      navigate("/login");
      return;
    }
    setSelectedProduct(product);
    setSelectedPhoneType("");
    setSelectedProvince("");
    setAddress("");
    setPhone("");
  };

  const handleAddToCartFromModal = () => {
    if (!phone.trim()) return alert("Please enter your phone number.");
    if (!/^\d+$/.test(phone) || phone.length !== 11)
      return alert("Invalid phone number. Must be 11 digits.");
    if (!selectedPhoneType) return alert("Please choose your phone model.");
    if (!selectedProvince) return alert("Please choose your province.");
    if (!address.trim()) return alert("Please enter your address.");

    const provinceData = allProvinces.find((p) => p.name === selectedProvince);

    addToCart(
      selectedProduct,
      selectedPhoneType,
      selectedProvince,
      provinceData?.shipping || 0,
      address,
      phone
    );

    setSelectedProduct(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen text-gray-900">
      {/* Navbar */}
      <div className="mb-20">
        <NavBar onSearch={setSearchQuery} />
      </div>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-r from-white to-gray-100 shadow-md rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Discover a case that describes your personality
        </h1>
        <p className="text-gray-600 mb-6">
          Best materials - Exclusive designs - Fast delivery to all provinces
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Shop Now
          </button>
          <Link to="/favourites">
            <button className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-full font-semibold hover:bg-[#D4AF37] hover:text-black transition">
              Favourites
            </button>
          </Link>
        </div>
      </section>

      {/* Products */}
      <div id="products" className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#D4AF37]">
          Explore Our Cases
        </h2>

        {filteredProducts.length === 0 ? (
      <p className="text-center text-gray-600 text-lg">
     There is no result for <span className="font-semibold text-gray-900">"{searchQuery}"</span>
  </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-5 flex flex-col items-center group"
              >
                <button
                  onClick={() => addToFavorites(product)}
                  className="absolute top-3 left-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition"
                >
                  <Heart className="w-5 h-5 text-pink-500" />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-contain mb-4 transform group-hover:scale-105 transition"
                  onClick={() => setSelectedProduct(product)}
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3">{product.price} EGP</p>

                <button
                  onClick={() => handleAddToCartFromCard(product)}
                  className="mt-auto w-full bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black px-4 py-2 rounded-full shadow hover:opacity-90 transition flex items-center justify-center gap-2 font-medium"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Swiper */}
      <div className="p-6 max-w-6xl mx-auto mt-16">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-5 flex flex-col items-center group">

    {/* Favorite Button */}
    <button
      onClick={() => addToFavorites(product)}
      className="absolute top-3 left-3 p-3 bg-white rounded-full shadow-md hover:bg-pink-100 transition"
    >
      <Heart className="w-5 h-5 text-pink-500" />
    </button>

    {/* Cart Button */}
    <button
      onClick={() => handleAddToCartFromCard(product)}
      className="absolute top-3 right-3 p-3 bg-white rounded-full shadow-md hover:bg-yellow-100 transition"
    >
      <ShoppingBag className="w-5 h-5 text-yellow-600" />
    </button>

    {/* Product Image */}
    <img
      src={product.image}
      alt={product.name}
      className="w-48 h-48 object-contain mb-4 transform group-hover:scale-105 transition"
      onClick={() => setSelectedProduct(product)}
    />

    {/* Product Info */}
    <h3 className="text-lg font-semibold text-gray-900 mb-1">
      {product.name}
    </h3>
    <p className="text-gray-600 mb-3">{product.price} EGP</p>
  </div>
</SwiperSlide>

          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Product Info */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-32 h-32 object-contain mb-3"
              />
              <h3 className="text-lg font-bold text-gray-900">
                {selectedProduct.name}
              </h3>
              <p className="text-gray-600">{selectedProduct.price} EGP</p>
            </div>

            {/* Phone Type */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Model
            </label>
            <select
              value={selectedPhoneType}
              onChange={(e) => setSelectedPhoneType(e.target.value)}
              className="w-full mb-4 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Choose phone model</option>
              {allPhoneTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Province */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full mb-4 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Choose your province</option>
              {allProvinces.map((province) => (
                <option key={province.name} value={province.name}>
                  {province.name} (+{province.shipping} EGP)
                </option>
              ))}
            </select>

            {/* Address */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full mb-4 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
            />

            {/* Phone Number */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full mb-6 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
            />

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCartFromModal}
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
          <div className="w-full sm:flex sm:items-center sm:justify-between " >
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
