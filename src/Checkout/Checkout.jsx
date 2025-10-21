import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { Trash2 } from "lucide-react";
import Footerr from "../Footerr/Footerr";
import { ChevronDown } from "lucide-react";

const Checkout = () => {
const { cart, discount = 0, deleteFromCart } = useContext(CartContext);
  const { setDiscount } = useContext(CartContext);

// ✅ جلب المنتج القادم من زر "Buy It Now" لو موجود
const [buyNowItem, setBuyNowItem] = useState(null);

  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  
  const provinces = [
    { name: "Cairo", shipping: 60 },
    { name: "Giza", shipping: 60 },
    { name: "Alexandria", shipping: 63 },
    { name: "Beheira", shipping: 63 },
    { name: "Kafr El-Sheikh", shipping: 70 },
    { name: "Damietta", shipping: 70 },
    { name: "Port Said", shipping: 70 },
    { name: "Monufia", shipping: 70 },
    { name: "Qalyubia", shipping: 70 },
    { name: "Gharbia", shipping: 70 },
    { name: "Sharqia", shipping: 70 },
    { name: "Suez", shipping: 70 },
    { name: "Dakahlia", shipping: 70 },
    { name: "Ismailia", shipping: 70 },
    { name: "Sohag", shipping: 81 },
    { name: "Beni Suef", shipping: 81 },
    { name: "Minya", shipping: 81 },
    { name: "Fayoum", shipping: 81 },
    { name: "Assiut", shipping: 81 },
    { name: "Marsa Matrouh", shipping: 92 },
    { name: "Qena", shipping: 92 },
    { name: "Red Sea", shipping: 92 },
    { name: "Luxor", shipping: 92 },
    { name: "Aswan", shipping: 92 },
    { name: "North Coast", shipping: 95 },
    { name: "South Sinai", shipping: 110 },
    { name: "New Valley", shipping: 110 },
    { name: "North Sinai", shipping: 110 },
    { name: "Other", shipping: 100 },
  ];

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    province: "",
    address: "",
    phone: "",
  });

  const [paymentType, setPaymentType] = useState("deposit");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ حالة التحميل الجديدة

  useEffect(() => {
  const storedItem = localStorage.getItem("checkout_item");
  if (storedItem) {
    setBuyNowItem(JSON.parse(storedItem));
    localStorage.removeItem("checkout_item"); // 🧹 علشان يمسحها بعد الاستخدام
  }
}, []);



 const subtotal = buyNowItem
  ? buyNowItem.price * buyNowItem.quantity
  : cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const selectedProvince = provinces.find((p) => p.name === customer.province);
  const shipping = selectedProvince ? selectedProvince.shipping : 0;
  const subtotalAfterDiscount = discount > 0 ? subtotal - discount : subtotal;
  const total = subtotalAfterDiscount + shipping;
  const deposit = total / 2;
  const paymentAmount = paymentType === "full" ? total : deposit;

 const TELEGRAM_BOT_TOKEN = "8392530573:AAE7Vsm4TmiLJrdPvgAr0nswYpNdJTwdfeU";
  const TELEGRAM_CHAT_ID = "5006473010";

const handlePayment = async () => {
  if (
    !customer.firstName ||
    !customer.lastName ||
    !customer.province ||
    !customer.address ||
    !customer.phone
  ) {
    alert("من فضلك املأ كل البيانات");
    return;
  }

  const itemsToSend = buyNowItem ? [buyNowItem] : cart;

  if (itemsToSend.length === 0) {
    alert("لا يوجد منتجات لإرسالها");
    return;
  }

  if (!paymentScreenshot) {
    alert("يرجى رفع صورة الإيصال");
    return;
  }

  setLoading(true);

  let lastOrderNumber = parseInt(
    localStorage.getItem("lastOrderNumber") || "0",
    10
  );
  lastOrderNumber += 1;
  localStorage.setItem("lastOrderNumber", lastOrderNumber);
  const referenceNumber = `ETCH${lastOrderNumber}`;

  // 🧾 نص الرسالة
  let message = `📦 *New Order!*\n`;
  message += `Reference: ${referenceNumber}\n`;
  message += `Name: ${customer.firstName} ${customer.lastName}\n`;
  message += `Phone: ${customer.phone}\n`;
  message += `Province: ${customer.province}\n`;
  message += `Address: ${customer.address}\n`;
  message += `Payment: ${
    paymentType === "full" ? "Full Payment" : "Deposit (50%)"
  }\n`;
  message += `Amount Paid: ${paymentType === "full" ? total : deposit} EGP\n\n`;

  message += `🛍️ *Products:*\n`;
  itemsToSend.forEach((item) => {
    message += `• ${item.name}\n`;
    message += `Brand: ${item.phoneBrand || "—"}\n`;
    message += `Model: ${item.phoneModel || "—"}\n`;
    message += `Size: ${item.size || "—"}\n`;
    message += `Quantity: ${item.quantity || 1}\n`;
    message += `Price: ${item.price * item.quantity} EGP\n\n`;
  });

  message += `Subtotal: ${subtotalAfterDiscount} EGP\n`;
  message += `Shipping: ${shipping} EGP\n`;
  message += `Total: ${total} EGP`;

  try {
    const formData = new FormData();
    const mediaArray = [];

    // 🖼️ أولاً: أضف صور المنتجات كملفات حقيقية
    for (let i = 0; i < itemsToSend.length; i++) {
      const item = itemsToSend[i];

      if (item.image) {
        const response = await fetch(item.image);
        const blob = await response.blob();
        const fileName = `product_${i}.jpg`;

        // نضيف الملف إلى formData
        formData.append(fileName, blob, fileName);

        // نضيفه كعنصر في mediaArray
        mediaArray.push({
          type: "photo",
          media: `attach://${fileName}`,
          caption: `🛍️ ${item.name}\nSize: ${item.size || "—"}\nQty: ${
            item.quantity
          }`,
        });
      }
    }

    // 🧾 ثم نضيف صورة الإيصال
    const receiptFileName = "receipt.jpg";
    formData.append(receiptFileName, paymentScreenshot, receiptFileName);
    mediaArray.push({
      type: "photo",
      media: `attach://${receiptFileName}`,
      caption: message,
      parse_mode: "Markdown",
    });

    // 💬 نضيف باقي البيانات
    formData.append("chat_id", TELEGRAM_CHAT_ID);
    formData.append("media", JSON.stringify(mediaArray));

    // 📤 نرسل الطلب
  // 📨 1️⃣ أولًا: أرسل التفاصيل كنص منفصل
await axios.post(
  `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
  {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: "Markdown",
  }
);

// 🖼️ 2️⃣ بعد كده: أرسل الصور (المنتجات + الإيصال)
await axios.post(
  `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`,
  formData,
  {
    headers: { "Content-Type": "multipart/form-data" },
  }
);


    alert("✅ تم إرسال الطلب بنجاح!");
  } catch (err) {
    console.error("Telegram Error:", err.response?.data || err.message);
    alert("❌ حدث خطأ أثناء إرسال الطلب. راجع الكونسول لمزيد من التفاصيل.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div>
      <div className="mb-20">
        <NavBar />
      </div>
      <div className="h-1"></div>
      <div className="mt-20 min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-6xl w-full bg-white p-8 rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Right Side - Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Your Order
            </h3>
         {(buyNowItem || cart.length > 0) ? (
  <div className="space-y-5">
    {(buyNowItem ? [buyNowItem] : cart).map((item) => (
  <div
    key={item.id}
    className="flex items-center gap-4 border-b pb-3"
  >
        {/* 🗑️ زر حذف المنتج */}
   

    
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-cover rounded-xl shadow-sm"
    />
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-gray-700">
        {item.name}
      </h4>

      {/* ✅ إضافة بيانات الموبايل والموديل */}
  <p className="text-gray-500 text-sm">
  Brand: <span className="font-medium text-gray-700">{item.phoneBrand || "—"}</span>
</p>
<p className="text-gray-500 text-sm">
  Model: <span className="font-medium text-gray-700">{item.phoneModel || "—"}</span>
</p>
      <p className="text-gray-500 text-sm">
        Quantity: <span className="font-medium text-gray-700">{item.quantity || 1}</span>
      </p>
<p className="text-gray-500 text-sm">
  Size: <span className="font-medium text-gray-700">{item.size || "—"}</span>
</p>


      <p className="font-bold text-gray-800 mt-1">
        {item.price * item.quantity} EGP
      </p>


    </div>
<button
  onClick={() => {
    if (buyNowItem) {
      // ✅ امسح منتج البيبي شارك (Buy Now)
      setBuyNowItem(null);
      localStorage.removeItem("checkout_item");
    } else {
      // ✅ امسح المنتج من السلة العادية
      deleteFromCart(item.id, item.size, item.phoneModel, item.province);
    }
  }}
  className="text-red-500 hover:text-red-700 transition"
  title="Remove item"
>
  <Trash2 size={20} />
</button>


  </div>
))}

                <div className="pt-3 space-y-1">
                  <div className="flex justify-between text-gray-600">
                    Subtotal: {subtotalAfterDiscount} EGP
                  </div>
                  <div className="flex justify-between text-gray-600">
                    Shipping: {total >= 500 ? "Free" : `${shipping} EGP`}
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 border-t pt-2">
                    Total: {total >= 500 ? total - shipping : total} EGP
                  </div>
                  <div className="flex justify-between font-semibold text-blue-600">
                    Deposit: {total >= 500 ? (total - shipping) / 2 : deposit} EGP
                  </div>
                </div>
              </div>
           ) : <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
  <div className="bg-gray-100 p-6 rounded-2xl shadow-sm w-fit">
    <p className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</p>
    <p className="text-sm text-gray-500">You haven’t placed any orders so far.</p>
  </div>
</div>
 }
          </div>

          {/* Left Side - Customer Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Customer Information
            </h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={customer.firstName}
                  onChange={(e) =>
                    setCustomer({ ...customer, firstName: e.target.value })
                  }
                  className="w-1/2 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={customer.lastName}
                  onChange={(e) =>
                    setCustomer({ ...customer, lastName: e.target.value })
                  }
                  className="w-1/2 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <select
                value={customer.province}
                onChange={(e) =>
                  setCustomer({ ...customer, province: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300"
              >
                <option value="">اختر المحافظة</option>
                {provinces.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} - {p.shipping} EGP
                  </option>
                ))}
              </select>
{/* ✅ Responsive Address Field */}
<textarea
  placeholder="Address"
  value={customer.address}
  onChange={(e) =>
    setCustomer({ ...customer, address: e.target.value })
  }
  rows={3}
  onInput={(e) => {
    // يجعل التيكست ايريا تكبر حسب النص المكتوب
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }}
  className="w-full border rounded-lg px-4 py-2 shadow-sm resize-none focus:ring-2 focus:ring-blue-300"
  style={{ minHeight: "60px", maxHeight: "200px" }}
/>

{/* ✅ Phone Number Field (11 digits validation) */}
<input
  type="tel"
  placeholder="Phone Number (11 digits)"
  value={customer.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // يمنع إدخال حروف
    if (value.length <= 11) {
      setCustomer({ ...customer, phone: value });
    }
  }}
  onBlur={() => {
    if (customer.phone.length !== 11) {
      alert("Check You Phone Number");
    }
  }}
  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300"
/>


              {/* اختيار الدفع */}
              <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentType"
                    value="full"
                    checked={paymentType === "full"}
                    onChange={() => setPaymentType("full")}
                    className="accent-blue-500"
                  />
                  Full Payment
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentType"
                    value="deposit"
                    checked={paymentType === "deposit"}
                    onChange={() => setPaymentType("deposit")}
                    className="accent-blue-500"
                  />
                  Deposit (50%)
                </label>
              </div>

              {/* رفع صورة الإيصال */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Upload Payment Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                  className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Payment Numbers Section */}
              <div className="mt-6 p-5 bg-blue-50 rounded-2xl border border-blue-100 shadow-inner">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">
                  Payment Numbers
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition">
                    <div className="flex items-center gap-2">
                      <img
                        src="\vodafone cash logo.jpeg"
                        alt="Vodafone"
                        className="w-6 h-6"
                      />
                      <span className="font-medium text-gray-700">
                        Vodafone Cash
                      </span>
                    </div>
                    <span className="font-bold text-green-600">
                      01006940976
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition">
                    <div className="flex items-center gap-2">
                      <img
                        src="\insta pay logo.jpeg"
                        alt="Instapay"
                        className="w-6 h-6"
                      />
                      <span className="font-medium text-gray-700">
                        Instapay
                      </span>
                    </div>
                    <span className="font-bold text-purple-600">
                      01023190531
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  يرجى تحويل المبلغ على أي من الأرقام السابقة وإرفاق صورة
                  الإيصال قبل الضغط على "Proceed to Payment".
                </p>
              </div>

   
              <button
                type="button"
                onClick={handlePayment}
                disabled={loading} // ✅ تعطيل الزر أثناء التحميل
                className={`w-full py-3 rounded-full mt-4 shadow-lg transition text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
                }`}
              >
                {loading ? " Loading... " : "Proceed to Payment"}
              </button>
              {/* 🏷️ Promo Code Section */}
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
        onClick={() => {
          if (promoCode === "DISCOUNT50") {
            alert("✅ Promo applied: 10% off");
            setDiscount(subtotal * 0.1);
          } else {
            alert("❌ Invalid promo code");
            setDiscount(0);
          }
        }}
        className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Apply Promo
      </button>
    </div>
  </div>
</div>

            </form>
          </div>
        </div>
      </div>
            <div><Footerr/></div>
      
    </div>
  );
};

export default Checkout;
