import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ChevronDown, X, ShoppingCartIcon } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import Footerr from "../Footerr/Footerr";

const ShoppingBag = () => {
  const { cart, addToCart, removeFromCart, deleteFromCart, discount, setDiscount } =
    useContext(CartContext);

  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingTotal = cart.reduce((acc, item) => acc + (item.shipping || 0), 0);
  const totalBeforeDiscount = subtotal + shippingTotal;
  const total = totalBeforeDiscount - discount;

  const handleApplyPromo = () => {
    if (promoCode === "DISCOUNT50") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  return (
    <div className="mb-20">
      <NavBar />
      <div className="h-20"></div>

      <div className="mt-20 min-h-screen bg-gray-100 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl mb-6 text-gray-800 text-center flex justify-center items-center">
            Your Cart <ShoppingCart className="ml-2" />
          </h1>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <ShoppingCartIcon
                  className="w-20 h-20 text-gray-300 drop-shadow-md"
                  strokeWidth={1.2}
                />
                <X
                  className="w-8 h-8 ml-1 text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow"
                  strokeWidth={2}
                />
              </div>
              <p className="text-gray-600 text-center text-base mt-6">
                Your bag is empty
              </p>
              <Link
                to="/"
                className="mt-4 bg-gradient-to-r from-[#56cfe1] to-[#48bfe3] text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
               // داخل الماب اللي بيعرض كل عنصر في السلة

<div
  key={`${item.id}-${item.phoneModel}-${item.province}`}
  className="flex flex-col md:flex-row justify-between md:items-center border-b pb-5 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
>
  {/* صورة وبيانات المنتج */}
  <div className="flex flex-col sm:flex-row items-center gap-4 md:w-1/2 w-full mb-4 md:mb-0">
    <img
      src={item.image}
      alt={item.name}
      className="lg:w-50 lg:h-60 sm:w-32 sm:h-32 object-contain border-rounded"
    />
    <div className="text-center sm:text-left">
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>

      {/* ✅ Brand */}
      <p className="text-gray-500 text-sm">
        {item.phoneBrand ? (
          <>
            Brand:{" "}
            <span className="font-medium text-gray-700">{item.phoneBrand}</span>
          </>
        ) : (
          <span className="text-gray-400 italic">No brand selected</span>
        )}
      </p>

      {/* ✅ Model */}
      <p className="text-gray-500 text-sm">
        {item.phoneModel ? (
          <>
            Model:{" "}
            <span className="font-medium text-gray-700">{item.phoneModel}</span>
          </>
        ) : (
          <span className="text-gray-400 italic">No model selected</span>
        )}
      </p>

      {/* ✅ Size (المقاس) */}
      <p className="text-gray-500 text-sm">
        {item.size ? (
          <>
            Size:{" "}
            <span className="font-medium text-gray-700">{item.size}</span>
          </>
        ) : (
          <span className="text-gray-400 italic">No size selected</span>
        )}
      </p>
    </div>
  </div>

  {/* باقي الكود كما هو */}
  <div className="flex justify-around md:justify-end items-center w-full md:w-1/2 text-center gap-6">
    {/* الكمية */}
    <div>
      <p className="text-sm text-gray-500 mb-1 font-medium">Quantity</p>
      <div className="flex items-center justify-center gap-2 bg-gray-50 px-3 py-1 rounded-full border">
 <button
  onClick={() =>
    removeFromCart(
      item.id,
      item.size,
      item.phoneModel,
      item.province,
      item.quantity
    )
  }
  disabled={item.quantity <= 1}
  className={`w-6 h-6 flex items-center justify-center rounded-full transition text-lg font-bold ${
    item.quantity <= 1
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-red-100 text-red-500 hover:bg-red-200"
  }`}
>
  -
</button>

        <span className="text-gray-800 font-medium w-6 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => addToCart(item)}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition text-lg font-bold"
        >
          +
        </button>
      </div>
    </div>

    {/* السعر */}
    <div>
      <p className="text-sm text-gray-500 font-medium">Total</p>
      <div className="h-3"></div>
      <p className="font-semibold text-gray-800">
        {item.price * item.quantity} EGP
      </p>
    </div>

    {/* زر الحذف */}
    <div>
      <button
        onClick={() =>
          deleteFromCart(item.id, item.size, item.phoneModel, item.province)
        }
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Trash2 className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </div>
</div>

              ))}
            </div>
          )}

          {/* Price Summary */}
          <div className="bg-gray-50 p-6 mt-10 rounded-xl shadow-inner flex flex-col justify-between max-w-lg mx-auto md:mx-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>

            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold mb-2">
                <span>Discount</span>
                <span>- {discount} EGP</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
              <span>Total</span>
              <span>{total} EGP</span>
            </div>

            {/* Promo Code Section */}
            <div className="mt-6">
              <button
                className="flex items-center gap-2 text-blue-600 hover:underline focus:outline-none"
                onClick={() => setShowPromo(!showPromo)}
              >
                <span>Do you have a promo code?</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    showPromo ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  showPromo ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
                  >
                    Apply Promo
                  </button>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="mt-6 text-center bg-black text-white px-5 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/"
              className="inline-block mt-4 text-gray-600 hover:text-gray-800 hover:underline transition"
            >
              ← Back to Home
            </Link>
          </div>
          <div className="mt-10">
      <div><Footerr/></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
