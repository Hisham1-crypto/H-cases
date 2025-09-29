import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, updateCart } = useContext(AuthContext);
  const cart = user?.cart || [];

  const [discount, setDiscount] = useState(0);

  const addToCart = (item) => {
    if (!user) return alert("Please Login With Your Account");

    const finalPhoneType = item.phoneModel?.trim();
    const finalProvince = item.province?.trim();
    const finalShipping = item.shipping ?? 0;
    const finalAddress = item.address?.trim();
    const finalPhone = item.phone?.trim();

    if (!finalPhoneType) return alert("من فضلك اختر نوع الموبايل");
    if (!finalProvince) return alert("من فضلك اختر المحافظة");
    if (!finalAddress) return alert("من فضلك ادخل عنوانك");
    if (!finalPhone) return alert("من فضلك ادخل رقم موبايل صحيح");

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

    const newCart = cart
      .map((item) =>
        item.id === id &&
        item.phoneModel === phoneModel &&
        item.province === province
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);

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
