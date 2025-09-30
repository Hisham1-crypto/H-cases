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

// Products
const products = [
  { id: 1, name: "Case - Abstract Orange", price: 150, image: "/case1.jpg" },
  { id: 2, name: "Case - Pink Minimal", price: 180, image: "/case2.jpg" },
  { id: 3, name: "Case - Black Marble", price: 200, image: "/case3.jpg" },
];

// Phone Brands & Models
const phoneData = {
  iPhone: ["iPhone 14 Pro", "iPhone 14", "iPhone 13"],
  Samsung: ["Samsung S23", "Samsung S22", "Samsung A72"],
  Xiaomi: ["Xiaomi 13", "Xiaomi 12", "Xiaomi Note 11"],
};

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
  const handleAddToCartClick = (product) => {
    if (!user) {
      alert("You must log in first to add products to the cart.");
      navigate("/login");
      return;
    }
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  // 🟡 Confirm Add
  const handleConfirmAdd = () => {
    if (!phoneForm.brand || !phoneForm.model) {
      alert("Please select brand and model.");
      return;
    }
    addToCart({ ...selectedProduct, ...phoneForm });
    setDrawerOpen(false);
    setPhoneForm({ brand: "", model: "", quantity: 1 });
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
            There is no result for{" "}
            <span className="font-semibold">{searchQuery}</span>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-5 flex flex-col items-center group"
              >
                {/* Add to Favorites */}
                <button
                  onClick={() => addToFavorites(product)}
                  className="absolute top-3 left-3 p-2 bg-gray-100 rounded-full shadow hover:scale-110 transition"
                >
                  <Heart className="w-5 h-5 text-pink-500" />
                </button>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => setModalProduct(product)}
                  className="w-40 h-40 object-contain mb-4 transform group-hover:scale-105 transition cursor-pointer"
                />

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3">{product.price} EGP</p>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCartClick(product)}
                  className="mt-auto w-full bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black px-4 py-2 rounded-full shadow hover:opacity-90 transition flex items-center justify-center gap-2 font-medium"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
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

      {/* Drawer */}
      {drawerOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          ></div>

          <div className="bg-white w-96 h-full p-6 shadow-2xl transform transition-transform duration-500 fixed right-0 top-0 flex flex-col">
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
              <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
              <p className="text-gray-600">{selectedProduct.price} EGP</p>
            </div>

           {/* Phone Selection */}
<h2 className="text-xl font-bold mb-5 text-gray-800">  Choose your phone model</h2>

{/* Brand */}
<div className="mb-5">
  <label className="block text-sm font-semibold text-gray-600 mb-2">
Brand  </label>
  <div className="relative">
    <select
      value={phoneForm.brand}
      onChange={(e) =>
        setPhoneForm({ ...phoneForm, brand: e.target.value, model: "" })
      }
      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 shadow-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-all outline-none"
    >
      <option value="">Choose your phone brand </option>
      {Object.keys(phoneData).map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </select>
    {/* سهم منسدل */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      ▼
    </span>
  </div>
</div>

{/* Model */}
{phoneForm.brand && (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-gray-600 mb-2">
Model    </label>
    <div className="relative">
      <select
        value={phoneForm.model}
        onChange={(e) =>
          setPhoneForm({ ...phoneForm, model: e.target.value })
        }
        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 shadow-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-all outline-none"
      >
        <option value=""> Phone model</option>
        {phoneData[phoneForm.brand].map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
      {/* سهم منسدل */}
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
        setPhoneForm({ ...phoneForm, quantity: Number(e.target.value) })
      }
      className="w-16 text-center border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
    />
    <button
      type="button"
      onClick={() =>
        setPhoneForm({ ...phoneForm, quantity: phoneForm.quantity + 1 })
      }
      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
    >
      +
    </button>
  </div>
</div>


            {/* Add to Cart */}
            <button
              onClick={handleConfirmAdd}
              className="mt-auto w-full bg-gradient-to-r from-[#D4AF37] to-yellow-400 text-black font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition"
            >
              Confirm Add to Cart
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
  );
};

export default Home;
