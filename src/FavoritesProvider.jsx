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

  // ✅ تحديث المفضلة لما المستخدم يتغير (تسجيل دخول / خروج)
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

  // ✅ إضافة منتج إلى المفضلة (بدون تكرار)
  const addToFavorites = (item) => {
    const size = item.size || "";
    const exists = favorites.find(
      (p) => p.id === item.id && (p.size ? p.size === size : true)
    );
    if (exists) return;

    const favoriteItem = {
      id: item.id,
      name: item.name || item.title,
      image: item.image,
      price: item.price,
      size,
      quantity: item.quantity || 1,
    };

    const newWishlist = [...favorites, favoriteItem];
    setFavorites(newWishlist);
    if (user) updateWishlist(newWishlist);
  };

  // ✅ حذف منتج من المفضلة
  const removeFromFavorites = (id, size) => {
    const newWishlist = favorites.filter(
      (p) => !(p.id === id && (size ? p.size === size : true))
    );
    setFavorites(newWishlist);
    if (user) updateWishlist(newWishlist);
  };

  // ✅ إضافة منتج من المفضلة إلى السلة (مع كل التفاصيل)
  const addFavoriteToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size || "",
      quantity: item.quantity || 1,
    };
    addToCart(cartItem, cartItem.quantity);
    alert(`🛒 تمت إضافة ${item.name} إلى السلة`);
  };
const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addFavoriteToCart,
         isFavorite
      }}
    >
      
      {children}
    </FavoritesContext.Provider>
  );
};
