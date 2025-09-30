import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
const { user, updateCart } = useContext(AuthContext);
const cart = user?.cart || [];

const [discount, setDiscount] = useState(0);

const addToCart = (item) => {
if (!user) return alert("Please Login With Your Account");

const finalPhoneType = item.phoneModel || "";
const finalProvince = item.province || "";
const finalShipping = item.shipping ?? 0;
const finalAddress = item.address || "";
const finalPhone = item.phone || "";

const existingItem = cart.find(
  (cartItem) =>
    cartItem.id === item.id &&
    cartItem.phoneModel === finalPhoneType &&
    cartItem.province === finalProvince
);

let newCart;
if (existingItem) {
  newCart = cart.map((cartItem) =>
    cartItem.id === item.id &&
    cartItem.phoneModel === finalPhoneType &&
    cartItem.province === finalProvince
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
} else {
  newCart = [
    ...cart,
    {
      ...item,
      phoneModel: finalPhoneType,
      province: finalProvince,
      shipping: finalShipping,
      address: finalAddress,
      phone: finalPhone,
      quantity: 1,
    },
  ];
}

updateCart(newCart);
return newCart;

};

const removeFromCart = (id, phoneModel, province) => {
if (!user) return;

const newCart = cart.map((item) =>
  item.id === id &&
  item.phoneModel === phoneModel &&
  item.province === province
    ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // ✅ ما يقلش عن 1
    : item
);

updateCart(newCart);
return newCart;

};

const deleteFromCart = (id, phoneModel, province) => {
if (!user) return;

const newCart = cart.filter(
  (item) =>
    !(item.id === id && item.phoneModel === phoneModel && item.province === province)
);

updateCart(newCart);
return newCart;

};

return (
<CartContext.Provider
value={{
cart,
addToCart,
removeFromCart,
deleteFromCart,
discount,
setDiscount,
}}
>
{children}
</CartContext.Provider>
);
};
