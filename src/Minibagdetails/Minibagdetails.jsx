import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Footerr from "../Footerr/Footerr";

const products = [
      {
    id: 18,
    name: "Deep Ocean Mini Bag",
    image: "/minibag/photo_1_2025-10-14_18-49-08.jpg",
    price: 400,
  },
  {
    id: 19,
    name: "Graffiti Vibe Mini Bag",
    image: "/minibag/photo_2_2025-10-14_18-49-08.jpg",
    price: 400,
  },
  {
    id: 20,
    name: "Black - White Mini Bag",
    image: "/minibag/photo_3_2025-10-14_18-49-08.jpg",
    price: 400,
  },
    {
    id: 21,
    name: "Color Pop Mini Bag",
    image: "/minibag/photo_4_2025-10-14_18-49-08.jpg",
    price: 400,
  },
      {
    id: 22,
    name: "Retro Pop Mini Bag",
    image: "/minibag/photo_5_2025-10-14_18-49-08.jpg",
    price: 400,
  },
      {
    id: 23,
    name: "Wild Berry Mini Bag",
    image: "/minibag/photo_6_2025-10-14_18-49-08.jpg",
    price: 400,
  },  
       {
    id: 24,
    name: "Fashion Girl Mini Bag",
    image: "/minibag/photo_7_2025-10-14_18-49-08.jpg",
    price: 400,
  },  
       {
    id: 25,
    name: "Blue Vibes Mini Bag",
    image: "/minibag/photo_8_2025-10-14_18-49-08.jpg",
    price: 400,
  },      
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const relatedProducts = products.filter((p) => p.id !== product.id);
  const [mainImage, setMainImage] = useState(product.image);


  useEffect(() => {
    setMainImage(product.image);
  }, [product]);
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);
const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!product) return <div>Product not found</div>;

  // ✅ إضافة المنتج للسلة
const handleAddToCart = () => {

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
    quantity: quantity,
  };

  addToFavorites(favoriteItem);
};

const handleBuyNow = () => {

  const buyNowProduct = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: quantity, // ✅ الكمية
  };

  // ✅ نحفظ المنتج في localStorage علشان نستخدمه في صفحة Checkout
  localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));

  // ✅ بعد كده ننتقل مباشرة لصفحة الـ Checkout
  navigate("/checkout");
};


  return (
    <div>
      <div className="mb-20">
        <NavBar />
      </div>
      <div className="h-5"></div>

      <div className="p-6 mt-20">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* صورة المنتج */}
<div className="md:w-1/2 bg-gray-50 p-4 rounded-lg flex flex-col items-center">
  {/* الصورة الرئيسية */}
  <img
    src={mainImage}
    alt={product.name}
    className="w-full h-auto rounded-lg object-cover mb-4 transition-all duration-300"
  />

  {/* الصور المصغرة */}
  <div className="flex gap-3 justify-center">
    <img
      src={product.image}
      alt="Main"
      className={`w-24 h-24 object-cover rounded-lg border cursor-pointer transition ${
        mainImage === product.image
          ? "border-lime-400"
          : "border-gray-300 hover:opacity-80"
      }`}
      onClick={() => setMainImage(product.image)}
    />
    <img
      src="/minibag/mini details.jpg"
      alt="Extra 1"
      className={`w-24 h-24 object-cover rounded-lg border cursor-pointer transition ${
        mainImage === "/minibag/mini details.jpg"
          ? "border-lime-400"
          : "border-gray-300 hover:opacity-80"
      }`}
      onClick={() => setMainImage("/minibag/mini details.jpg")}
    />
    <img
      src="/minibag/minibag detail2.jpg"
      alt="Extra 2"
      className={`w-24 h-24 object-cover rounded-lg border cursor-pointer transition ${
        mainImage === "/minibag/minibag detail2.jpg"
          ? "border-lime-400"
          : "border-gray-300 hover:opacity-80"
      }`}
      onClick={() => setMainImage("/minibag/minibag detail2.jpg")}
    />
  </div>
</div>
          {/* بيانات المنتج */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {/* الاسم */}
            <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

            {/* السعر */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 line-through text-lg">
                {/* EGP {product.oldPrice} */}
              </span>
              <span className="text-blue-600 text-2xl font-bold">
                EGP {product.price}
              </span>
              <span className="bg-yellow-300 text-xs font-semibold px-2 py-1 rounded-full text-gray-700">
                SALE
              </span>
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
                className="flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-full font-medium shadow-sm"
              >
                <Heart className="text-green-500" />
                Add To Favorites
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

            {/* اللينك التحتي */}
            {/* <p
              className="text-blue-600 mt-3 underline cursor-pointer text-sm"
              onClick={() => alert("Shipping, Return & Refund Policies")}
            >
              Shipping, Return & Refund Policies
            </p> */}
           <div className="mt-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
    Product Details
  </h2>
  <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
    <li className="flex items-start gap-2">
      <span className="text-lime-500 mt-1">•</span>
      <span>Premium, durable fabric</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="text-lime-500 mt-1">•</span>
      <span>Washable and easy to clean</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="text-lime-500 mt-1">•</span>
      <span>Adjustable strap for all sizes</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="text-lime-500 mt-1">•</span>
      <span>Extra back pocket for secure storage</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="text-lime-500 mt-1">•</span>
      <span>Approximately 18 cm in length, 14 cm wide and a depth of almost 5 cm</span>
    </li>
  </ul>
</div>
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
