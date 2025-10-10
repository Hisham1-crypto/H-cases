import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

// 🧡 Add to Favorites
export const addToFavorites = async (product) => {
  const user = auth.currentUser;

  if (user) {
    // ✅ لو عامل login → خزّن في Firebase
    const userRef = doc(db, "favorites", user.uid);
    await setDoc(userRef, { items: arrayUnion(product) }, { merge: true });
  } else {
    // 🧩 لو مش عامل login → خزّن محلي
    const localFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavs = [...localFavs, product];
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  }
};

// 🛒 Add to Cart
export const addToCart = async (product) => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "cart", user.uid);
    await setDoc(userRef, { items: arrayUnion(product) }, { merge: true });
  } else {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...localCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};

// 🧡 Get Favorites
export const getFavorites = async () => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "favorites", user.uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data().items || [] : [];
  } else {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }
};

// 🛒 Get Cart
export const getCart = async () => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, "cart", user.uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data().items || [] : [];
  } else {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
};
