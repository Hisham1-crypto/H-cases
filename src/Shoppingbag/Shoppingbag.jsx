import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";

const ShoppingBag = () => {
  const { cart, addToCart, removeFromCart, deleteFromCart, discount, setDiscount } = useContext(CartContext);

  //  استيت للبرومو
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // المجموع الفرعي
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // إجمالي الشحن
  const shippingTotal = cart.reduce((acc, item) => acc + (item.shipping || 0), 0);

  // الإجمالي قبل الخصم
  const totalBeforeDiscount = subtotal + shippingTotal;

  //  الإجمالي بعد الخصم
  const total = totalBeforeDiscount - discount;

  //  لوجيك البرومو كود
  const handleApplyPromo = () => {
    if (promoCode === "DISCOUNT50") {
      setDiscount(subtotal * 0.1); // خصم 10%
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left flex">
            Your Cart <ShoppingCart className="m-1" />
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-600 text-center">Your bag is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.phoneModel}-${item.province}`}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-xl"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>

                      <p className="text-sm text-gray-500 mb-1">
                        Phone Model: <span className="font-medium">{item.phoneModel}</span>
                      </p>

                      <p className="text-sm text-gray-500 mb-1">
                        Goverment: <span className="font-medium">{item.province}</span> (
                        {item.shipping} EGP Shipping)
                      </p>

                      {item.address && (
                        <p className="text-sm text-gray-500 mb-1">
                          Address: <span className="font-medium">{item.address}</span>
                        </p>
                      )}
                      {item.phone && (
                        <p className="text-sm text-gray-500 mb-1">
                          Phone: <span className="font-medium">{item.phone}</span>
                        </p>
                      )}

                      <p className="text-gray-600">
                        {item.price} EGP x {item.quantity} = {item.price * item.quantity} EGP
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => removeFromCart(item.id, item.phoneModel, item.province)}
                          className="px-2 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200 transition"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-2 py-1 bg-green-100 text-green-500 rounded hover:bg-green-200 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteFromCart(item.id, item.phoneModel, item.province)}
                    className="text-white bg-gray-700 p-2 rounded-full hover:bg-gray-800 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner flex flex-col justify-between">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>{subtotal} EGP</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping</span>
            <span>{shippingTotal} EGP</span>
          </div>

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
            {!showPromo ? (
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowPromo(true)}
              >
                Do you have a promo code?
              </button>
            ) : (
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
            )}
          </div>

          {/* Checkout Button */}
          <Link
            to="/checkout"
            className="mt-6 text-center bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-3 rounded-full shadow-md hover:from-orange-600 hover:to-pink-600 transition-transform transform hover:scale-105"
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
      </div>
    </div>
  );
};

export default ShoppingBag;
