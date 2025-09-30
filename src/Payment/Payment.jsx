// src/PaymentPage.jsx
import React, { useState } from "react";
import axios from "axios";

const PaymentPage = ({ orderData }) => {
  const [paymentType, setPaymentType] = useState("full"); // full أو deposit
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const TELEGRAM_BOT_TOKEN = "7627147252:AAELRiOLp440ZlUulyMf_R2b8LqIQZXSzBs";
  const TELEGRAM_CHAT_ID = "6762937189";

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleConfirmPayment = async () => {
    if (!receipt) {
      alert("من فضلك ارفع صورة التحويل");
      return;
    }

    setLoading(true);

    try {
      // تحويل صورة الإيصال إلى base64
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const receiptBase64 = await toBase64(receipt);

      // تجهيز رسالة التليجرام
      let message = `📦 *New Order!*\n`;
      message += `Reference: ${orderData.referenceNumber}\n`;
      message += `Name: ${orderData.customer.firstName} ${orderData.customer.lastName}\n`;
      message += `Phone: ${orderData.customer.phone}\n`;
      message += `Province: ${orderData.customer.province}\n`;
      message += `Address: ${orderData.customer.address}\n`;
      message += `Payment Type: ${paymentType === "full" ? "Full Payment" : "Deposit 50%"}\n`;
      message += `\n*Products:*\n`;
      orderData.cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} = ${item.price * item.quantity} EGP\n`;
      });
      message += `\nSubtotal: ${orderData.subtotalAfterDiscount} EGP\n`;
      message += `Shipping: ${orderData.shipping} EGP\n`;
      message += `Deposit: ${orderData.deposit} EGP\n`;
      message += `Total: ${orderData.total} EGP`;

      // إرسال الرسالة
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      });

      // إرسال صورة الإيصال على Telegram (كملف)
      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("photo", receipt);

      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("تم إرسال الأوردر والتحويل على التليجرام بنجاح!");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إرسال الأوردر.");
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
          <select value={paymentType} onChange={e => setPaymentType(e.target.value)} className="w-full border rounded px-3 py-2">
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
