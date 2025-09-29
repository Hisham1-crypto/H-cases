// src/FavoritesProvider.js
import React, { createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { CartContext } from "./CartContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, updateWishlist } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const wishlist = user?.wishlist || [];

  const addToFavorites = (item) => {
    if (!user) return alert("من فضلك سجل دخول الأول");

    const exists = wishlist.find((p) => p.id === item.id);
    if (exists) return;

    const newWishlist = [...wishlist, item];
    updateWishlist(newWishlist);
  };

  const removeFromFavorites = (id) => {
    if (!user) return;
    const newWishlist = wishlist.filter((p) => p.id !== id);
    updateWishlist(newWishlist);
  };

  // ✅ إضافة من الفيفوريتس إلى الكارت مع عرض اسم المنتج
  const addFavoriteToCart = (item, phoneType, province, shipping, address, phone) => {
    if (!user) return alert("من فضلك سجل دخول الأول");

    addToCart(item, phoneType, province, shipping, address,phone);
    alert(` تمت إضافة ${item.name || item.title} إلى السلة`);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: wishlist,
        addToFavorites,
        removeFromFavorites,
        addFavoriteToCart,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
