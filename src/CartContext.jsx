// src/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, updateCart } = useContext(AuthContext);

  // ✅ تحميل السلة الأولية
  const [cartState, setCartState] = useState(() => {
    if (user?.cart) return user.cart;
    const localCart = localStorage.getItem("guest_cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  const [discount, setDiscount] = useState(0);

  // ✅ تحديث السلة عند تغير المستخدم
  useEffect(() => {
    const getInitialCart = () => {
      if (user?.cart) return user.cart;
      const localCart = localStorage.getItem("guest_cart");
      return localCart ? JSON.parse(localCart) : [];
    };
    setCartState(getInitialCart());
  }, [user]);

  // ✅ حفظ السلة في localStorage عند الزوار
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_cart", JSON.stringify(cartState));
    }
  }, [cartState, user]);

  // 🔍 دالة مساعدة لتحديد المنتج الفريد
  const isSameItem = (a, b) => {
    return (
      a.id === b.id &&
      (a.size || "") === (b.size || "") &&
      (a.phoneModel || "") === (b.phoneModel || "") &&
      (a.province || "") === (b.province || "")
    );
  };

  // ✅ إضافة المنتج للسلة
const addToCart = (item, quantityToAdd = 1) => {
  const normalizedItem = {
    ...item,
    phoneBrand: item.phoneBrand || item.brand || "Not Selected",
    phoneModel: item.phoneModel || item.model || "Not Selected",
    province: item.province || "",
    size: item.size || "",
  };

  const existingItem = cartState.find((cartItem) =>
    isSameItem(cartItem, normalizedItem)
  );

  // 👇 استخدم الكمية اللي جاية من المنتج لو موجودة
  const addQuantity = item.quantity || quantityToAdd;

  let newCart;
  if (existingItem) {
    newCart = cartState.map((cartItem) =>
      isSameItem(cartItem, normalizedItem)
        ? { ...cartItem, quantity: cartItem.quantity + addQuantity }
        : cartItem
    );
  } else {
    newCart = [...cartState, { ...normalizedItem, quantity: addQuantity }];
  }

  setCartState(newCart);
  if (user) updateCart(newCart);
};


  // ✅ تقليل الكمية من منتج
 const removeFromCart = (id, size, phoneModel, province, quantity) => {
  const newCart = cartState.map((item) => {
    if (
      item.id === id &&
      (item.size || "") === (size || "") &&
      (item.phoneModel || "") === (phoneModel || "") &&
      (item.province || "") === (province || "")
    ) {
      // قلل الكمية لو أكبر من 1
      const newQuantity = Math.max(quantity - 1, 1);
      return { ...item, quantity: newQuantity };
    }
    return item;
  });

  setCartState(newCart);
  if (user) updateCart(newCart);
};


  // ✅ حذف منتج نهائيًا
  const deleteFromCart = (id, size, phoneModel, province) => {
    const newCart = cartState.filter(
      (item) =>
        !(
          item.id === id &&
          (item.size || "") === (size || "") &&
          (item.phoneModel || "") === (phoneModel || "") &&
          (item.province || "") === (province || "")
        )
    );
    setCartState(newCart);
    if (user) updateCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
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
