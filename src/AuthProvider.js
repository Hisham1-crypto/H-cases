// src/AuthProvider.js
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Signup
  const signup = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) {
      await updateProfile(result.user, { displayName });
    }

    const docRef = doc(db, "users", result.user.uid);
    await setDoc(docRef, {
      name: displayName || "",
      email,
      cart: [],
      wishlist: [],
    });

    setUser({
      uid: result.user.uid,
      email,
      displayName: displayName || "",
      cart: [],
      wishlist: [],
    });

    return result;
  };

  // 🟢 Login
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "users", result.user.uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || "",
        cart: data.cart || [],
        wishlist: data.wishlist || [],
      });
    } else {
      await setDoc(docRef, {
        name: result.user.displayName || "",
        email: result.user.email,
        cart: [],
        wishlist: [],
      });
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || "",
        cart: [],
        wishlist: [],
      });
    }

    return result;
  };

  // 🟢 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🟢 Update Cart
  const updateCart = async (cart) => {
    if (!user?.uid) return;
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, { cart });
    setUser((prev) => ({ ...prev, cart }));
  };

  // 🟢 Update Wishlist
  const updateWishlist = async (wishlist) => {
    if (!user?.uid) return;
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, { wishlist });
    setUser((prev) => ({ ...prev, wishlist }));
  };

  // 🟢 Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            cart: data.cart || [],
            wishlist: data.wishlist || [],
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        updateCart,
        updateWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
