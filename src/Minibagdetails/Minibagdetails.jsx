import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";

const products = [
  {
    id: 1,
    name: "mini bag",
    image: "/minibag/photo_1_2025-10-14_18-49-08.jpg",
    price: 200,
  },
  {
    id: 2,
    name: "mini bag",
    image: "/minibag/photo_2_2025-10-14_18-49-08.jpg",
    price: 250,
  },
  {
    id: 3,
    name: "mini bag",
    image: "/minibag/photo_3_2025-10-14_18-49-08.jpg",
    price: 300,
  },
    {
    id: 4,
    name: "mini bag",
    image: "/minibag/photo_4_2025-10-14_18-49-08.jpg",
    price: 300,
  },
      {
    id: 5,
    name: "mini bag",
    image: "/minibag/photo_5_2025-10-14_18-49-08.jpg",
    price: 300,
  },
      {
    id: 6,
    name: "mini bag",
    image: "/minibag/photo_6_2025-10-14_18-49-08.jpg",
    price: 300,
  },  
       {
    id: 7,
    name: "mini bag",
    image: "/minibag/photo_7_2025-10-14_18-49-08.jpg",
    price: 300,
  },  
       {
    id: 8,
    name: "mini bag",
    image: "/minibag/photo_8_2025-10-14_18-49-08.jpg",
    price: 300,
  },  
    
];


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // ✅ المقاس

  if (!product) return <div>Product not found</div>;

  // ✅ إضافة المنتج للسلة
  const handleAddToCart = () => {

    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize,
      quantity,
    });

  };

  // ✅ إضافة للمفضلة
  const handleFavorite = () => {
    addToFavorites({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
  };

  const handleBuyNow = () => {
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
          <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover"
            />
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
            <p
              className="text-blue-600 mt-3 underline cursor-pointer text-sm"
              onClick={() => alert("Shipping, Return & Refund Policies")}
            >
              Shipping, Return & Refund Policies
            </p>
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
    </div>
  );
};

export default ProductDetails;
