// src/FavoritesProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { CartContext } from "./CartContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, updateWishlist } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  // ✅ تحميل المفضلة من localStorage أو من user.wishlist
  const getInitialFavorites = () => {
    if (user?.wishlist) return user.wishlist;
    const localFavorites = localStorage.getItem("guest_wishlist");
    return localFavorites ? JSON.parse(localFavorites) : [];
  };

  const [favorites, setFavorites] = useState(getInitialFavorites);

  // ✅ تحديث المفضلة عند تغيّر المستخدم (تسجيل دخول / خروج)
  useEffect(() => {
    const getFavorites = () => {
      if (user?.wishlist) return user.wishlist;
      const localFavorites = localStorage.getItem("guest_wishlist");
      return localFavorites ? JSON.parse(localFavorites) : [];
    };

    setFavorites(getFavorites());
  }, [user]);

  // ✅ حفظ المفضلة في localStorage لو المستخدم مش عامل login
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_wishlist", JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = (item) => {
    const exists = favorites.find((p) => p.id === item.id);
    if (exists) return;

    const newWishlist = [...favorites, item];
    setFavorites(newWishlist);
    if (user) updateWishlist(newWishlist);
  };

  const removeFromFavorites = (id) => {
    const newWishlist = favorites.filter((p) => p.id !== id);
    setFavorites(newWishlist);
    if (user) updateWishlist(newWishlist);
  };

  // ✅ إضافة من الفيفوريتس إلى الكارت
  const addFavoriteToCart = (item, phoneType, province, shipping, address, phone) => {
    addToCart(item, phoneType, province, shipping, address, phone);
    alert(`تمت إضافة ${item.name || item.title} إلى السلة`);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addFavoriteToCart,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
