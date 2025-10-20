import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Footerr from "../Footerr/Footerr";

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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  const { addToCart } = useContext(CartContext);
const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) return <div>Product not found</div>;

const handleAddToCart = () => {
  if (!selectedSize)
    return alert("Please select a size before adding to cart!");

  const cartItem = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    size: selectedSize,
  };

  // ✅ هنا نبعت الكمية فعلاً
  addToCart(cartItem, quantity);
};



 const handleFavorite = () => {
  const favoriteItem = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    size: selectedSize || "Not selected",
    quantity: quantity,
  };

  if (isFavorite(product.id)) {
    removeFromFavorites(product.id);
  } else {
    addToFavorites(favoriteItem);
  }
};

const handleBuyNow = () => {
  if (!selectedSize) return alert("Please select a size before buying!");

  const buyNowProduct = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    size: selectedSize,
    quantity: quantity, // ✅ الكمية
  };

  // ✅ نحفظ المنتج في localStorage علشان نستخدمه في صفحة Checkout
  localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));

  // ✅ بعد كده ننتقل مباشرة لصفحة الـ Checkout
  navigate("/checkout");
};


  // ✅ منتجات مشابهة (غير المنتج الحالي)
  const relatedProducts = products.filter((p) => p.id !== product.id);

  return (
    <div>
      <div className="mb-20">
        <NavBar />
      </div>
      <div className="h-5"></div>

      <div className="p-6 mt-20">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* صورة المنتج */}
          <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* بيانات المنتج */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-blue-600 text-2xl font-bold">
                EGP {product.price}
              </span>
              <span className="bg-yellow-300 text-xs font-semibold px-2 py-1 rounded-full text-gray-700">
                SALE
              </span>
            </div>

            {/* المقاسات */}
            <div>
              <p className="font-semibold text-gray-700 mb-2">SELECT SIZE</p>
              <div className="flex flex-wrap gap-3">
                {["12 inch", "13 inch", "14 inch", "15.6 inch", "17 inch"].map(
                  (size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-4 py-2 rounded-full font-medium transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* الكمية */}
            <div>
              <p className="font-semibold text-gray-700 mb-2">QUANTITY</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-100 hover:bg-gray-200 text-lg font-bold rounded px-3 py-1"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-100 hover:bg-gray-200 text-lg font-bold rounded px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-wrap gap-4 mt-4">
        <button
            onClick={handleFavorite}
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-full font-medium shadow-sm transition-all"
          >
            <Heart
              className="transition"
              size={22}
              fill={isFavorite(product.id) ? "rgb(236,72,153)" : "none"}   // يتملي لو مضاف
            color={isFavorite(product.id) ? "rgb(236,72,153)" : "rgb(236,72,153)"}  // اللون الأساسي بينك دايمًا
            />
            Add to Favorites
          </button>

              <button
                onClick={handleAddToCart}
                className="bg-lime-400 hover:bg-lime-500 text-gray-800 font-semibold px-8 py-3 rounded-full transition-all"
              >
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold px-8 py-3 rounded-full transition-all"
              >
                Buy It Now
              </button>
            </div>

            {/* <p
              className="text-blue-600 mt-3 underline cursor-pointer text-sm"
              onClick={() => alert("Shipping, Return & Refund Policies")}
            >
              Shipping, Return & Refund Policies
            </p> */}
          </div>
        </div>

      </div>
            {/* 🔻 Things You May Like Section */}
            <div className="max-w-6xl mx-auto px-6 mt-20 mb-20">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Things You May Like
              </h2>
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {relatedProducts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div
                      onClick={() => navigate(`/minibagdetails/${item.id}`)}
                      className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-lg font-semibold text-gray-700 truncate">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-bold">EGP {item.price}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
                  <div><Footerr/></div>
            
    </div>
  );
};

export default ProductDetails;
