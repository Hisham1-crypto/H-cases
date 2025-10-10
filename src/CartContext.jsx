import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, updateCart } = useContext(AuthContext);
  const [cartState, setCartState] = useState(() => {
    if (user?.cart) return user.cart;
    const localCart = localStorage.getItem("guest_cart");
    return localCart ? JSON.parse(localCart) : [];
  });
  const [discount, setDiscount] = useState(0);

  // ✅ تحديث cart لما المستخدم يتغير (يسجل دخول أو خروج)
  useEffect(() => {
    const getInitialCart = () => {
      if (user?.cart) return user.cart;
      const localCart = localStorage.getItem("guest_cart");
      return localCart ? JSON.parse(localCart) : [];
    };

    setCartState(getInitialCart());
  }, [user]);

  // ✅ حفظ cart في localStorage لما المستخدم مش عامل login
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_cart", JSON.stringify(cartState));
    }
  }, [cartState, user]);

  // ✅ إضافة المنتج للسلة (مع نقل الكمية والبراند والموديل صح)
const addToCart = (item, quantityToAdd = 1) => {
  const phoneBrand = item.phoneBrand || item.brand || "Not Selected";
  const phoneModel = item.phoneModel || item.model || "Not Selected";
  const province = item.province || "";

  const existingItem = cartState.find(
    (cartItem) =>
      cartItem.id === item.id &&
      cartItem.phoneModel === phoneModel &&
      cartItem.province === province
  );

  
  let newCart;
  if (existingItem) {
    newCart = cartState.map((cartItem) =>
      cartItem.id === item.id &&
      cartItem.phoneModel === phoneModel &&
      cartItem.province === province
        ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
        : cartItem
    );
    } else {
    newCart = [
      ...cartState,
      { ...item, phoneBrand, phoneModel, province, quantity: quantityToAdd },
    ];
  }

    setCartState(newCart);
    if (user) updateCart(newCart);
  };

  const removeFromCart = (id, phoneModel, province) => {
    const newCart = cartState.map((item) =>
      item.id === id && item.phoneModel === phoneModel && item.province === province
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartState(newCart);
    if (user) updateCart(newCart);
  };

  const deleteFromCart = (id, phoneModel, province) => {
    const newCart = cartState.filter(
      (item) => !(item.id === id && item.phoneModel === phoneModel && item.province === province)
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
