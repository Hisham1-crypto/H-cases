import React, { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

const Payment = ({ cart }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handlePayment = async () => {
    if (!cart.length) {
      alert("السلة فاضية");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      setLoading(true);

      const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");
      const res = await createPaymentIntent({
        amount: total,
        email: "customer@email.com",
        productName: cart[0].name,
      });

      const { clientSecret } = res.data;

      // فتح صفحة الدفع الجاهزة من Paymob
      window.location.href = `https://accept.paymobsolutions.com/api/acceptance/iframes/YOUR_IFRAME_ID?payment_token=${clientSecret}`;
    } catch (err) {
      console.error(err);
      setMsg("حصلت مشكلة أثناء الدفع، حاول تاني.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">إتمام الدفع</h2>
      <p>المطلوب دفعه كوديعة: <b>{(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.5).toFixed(2)} EGP</b></p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4"
      >
        {loading ? "جارٍ المعالجة..." : "ادفع الآن"}
      </button>

      {msg && <p className="mt-3 text-red-600">{msg}</p>}
    </div>
  );
};

export default Payment;
