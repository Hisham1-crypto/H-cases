import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, discount = 0 } = useContext(CartContext);

  // Subtotal (سعر المنتجات قبل الخصم)
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Shipping total (إجمالي الشحن)
  const shippingTotal = cart.reduce(
    (acc, item) => acc + (item.shipping || 0),
    0
  );

  // Subtotal بعد الخصم
  const subtotalAfterDiscount = discount > 0 ? subtotal - discount : subtotal;

  // الإجمالي النهائي (Subtotal بعد الخصم + الشحن)
  const total = subtotalAfterDiscount + shippingTotal;

  // الديبوزيت = 50% من الإجمالي بعد الخصم
  const deposit = total * 0.5;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white p-8 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.phoneType}-${item.province}`}
                  className="border-b pb-3"
                >
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Phone Model: <span className="font-medium">{item.phoneType}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Province: <span className="font-medium">{item.province}</span>{" "}
                    ({item.shipping} EGP Shipping)
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: <span className="font-medium">{item.address || "—"}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.price} EGP × {item.quantity} ={" "}
                    {item.price * item.quantity} EGP
                  </p>
                </div>
              ))}

              {/* Totals */}
              <div className="pt-4 space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal} EGP</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-{discount} EGP</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingTotal} EGP</span>
                </div>

                <div className="flex justify-between font-bold text-gray-900 border-t pt-3 text-lg">
                  <span>Total (After Discount)</span>
                  <span>{total} EGP</span>
                </div>
                <div className="flex justify-between text-pink-600 font-semibold">
                  <span>Deposit (50%)</span>
                  <span>{deposit} EGP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Checkout
          </h2>

          <Link to="/payment">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-full shadow-md hover:from-orange-600 hover:to-pink-600 transition-transform transform hover:scale-105"
            >
              Pay {deposit} EGP Deposit
            </button>
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

export default Checkout;
