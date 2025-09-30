import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const Checkout = () => {
  const { cart, discount = 0 } = useContext(CartContext);

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

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const selectedProvince = provinces.find((p) => p.name === customer.province);
  const shipping = selectedProvince ? selectedProvince.shipping : 0;
  const subtotalAfterDiscount = discount > 0 ? subtotal - discount : subtotal;
  const total = subtotalAfterDiscount + shipping;
  const deposit = total / 2;
  const paymentAmount = paymentType === "full" ? total : deposit;

  const TELEGRAM_BOT_TOKEN = "7627147252:AAELRiOLp440ZlUulyMf_R2b8LqIQZXSzBs";
  const TELEGRAM_CHAT_ID = "6762937189";

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
    if (cart.length === 0) {
      alert("سلة المشتريات فارغة");
      return;
    }
    if (!paymentScreenshot) {
      alert("يرجى رفع صورة الإيصال");
      return;
    }

    let lastOrderNumber = parseInt(
      localStorage.getItem("lastOrderNumber") || "0",
      10
    );
    lastOrderNumber += 1;
    localStorage.setItem("lastOrderNumber", lastOrderNumber);
    const referenceNumber = `ETCH${lastOrderNumber}`;

    let message = `📦 *New Order!*\n`;
    message += `Reference: ${referenceNumber}\n`;
    message += `Name: ${customer.firstName} ${customer.lastName}\n`;
    message += `Phone: ${customer.phone}\n`;
    message += `Province: ${customer.province}\n`;
    message += `Address: ${customer.address}\n`;
    message += `Payment: ${
      paymentType === "full" ? "Full Payment" : "Deposit (50%)"
    }\n`;
    message += `Amount Paid: ${paymentAmount} EGP\n`;
    message += `\n*Products:*\n`;
    cart.forEach((item) => {
      message += `- ${item.name} x${item.quantity} = ${
        item.price * item.quantity
      } EGP\n`;
    });
    message += `\nSubtotal: ${subtotalAfterDiscount} EGP\n`;
    message += `Shipping: ${shipping} EGP\n`;
    message += `Total: ${total} EGP`;

    try {
      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("caption", message);
      formData.append("photo", paymentScreenshot);

      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(
        `تم إرسال بيانات الطلب على التليجرام بنجاح!\nReference: ${referenceNumber}`
      );
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إرسال الطلب على التليجرام.");
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
            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-700">
                        {item.name}
                      </h4>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-bold text-gray-800">
                        {item.price * item.quantity} EGP
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-3 space-y-1">
                  <div className="flex justify-between text-gray-600">
                    Subtotal: {subtotalAfterDiscount} EGP
                  </div>
                  <div className="flex justify-between text-gray-600">
                    Shipping: {shipping} EGP
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 border-t pt-2">
                    Total: {total} EGP
                  </div>
                  <div className="flex justify-between font-semibold text-blue-600">
                    Deposit: {deposit} EGP
                  </div>
                </div>
              </div>
            )}
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

              <input
                type="text"
                placeholder="Address"
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
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
                className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 rounded-full mt-4 shadow-lg hover:from-blue-500 hover:to-blue-600 transition"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
