import React, { useState } from "react";
import axios from "axios";

const PaymentPage = ({ orderData }) => {
  const [paymentType, setPaymentType] = useState("full");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const TELEGRAM_BOT_TOKEN = "8392530573:AAE7Vsm4TmiLJrdPvgAr0nswYpNdJTwdfeU";
  const TELEGRAM_CHAT_ID = "5006473010";

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleConfirmPayment = async () => {
    if (!receipt) {
      // alert("من فضلك ارفع صورة التحويل");
      return;
    }

    setLoading(true);

    try {
      // 📦 تجهيز رسالة الأوردر
      let message = `📦 *New Order!*\n`;
      message += `🧾 *Reference:* ${orderData.referenceNumber}\n`;
      message += `👤 *Name:* ${orderData.customer.firstName} ${orderData.customer.lastName}\n`;
      message += `📞 *Phone:* ${orderData.customer.phone}\n`;
      message += `🏙️ *Province:* ${orderData.customer.province}\n`;
      message += `📍 *Address:* ${orderData.customer.address}\n`;
      message += `💳 *Payment Type:* ${
        paymentType === "full" ? "Full Payment" : "Deposit 50%"
      }\n\n`;

      message += `🛍️ *Products:*\n`;
      orderData.cart.forEach((item) => {
        message += `- ${item.name} x${item.quantity} = ${
          item.price * item.quantity
        } EGP\n`;
      });

      message += `\n💰 *Subtotal:* ${orderData.subtotalAfterDiscount} EGP\n`;
      message += `🚚 *Shipping:* ${orderData.shipping} EGP\n`;
      message += `💵 *Deposit:* ${orderData.deposit} EGP\n`;
      message += `💳 *Total:* ${orderData.total} EGP`;

      // 🔸 1. إرسال الصورة أولًا بدون كابشن
      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("photo", receipt);

      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // 🔸 2. ننتظر ثانية واحدة (عشان ما يتدمجوش)
      await new Promise((res) => setTimeout(res, 3000));

      // 🔸 3. إرسال الرسالة النصية بعد الصورة
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }
      );

      alert("✅ تم إرسال الأوردر والتحويل بنجاح!");
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء إرسال الأوردر.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <div>
          <label className="block mb-2 font-semibold">اختر نوع الدفع:</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="full">دفع كامل</option>
            <option value="deposit">50% ديبوزت</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">رفع صورة التحويل:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button
          onClick={handleConfirmPayment}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-full mt-4"
        >
          {loading ? "جاري الإرسال..." : "تأكيد الدفع وإرسال الأوردر"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
