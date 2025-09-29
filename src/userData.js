// userData.js
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

// ⬅️ إضافة منتج للفيفوريتس
export const addToFavorites = async (product) => {
  const user = auth.currentUser;
  if (!user) return alert("Please login first");

  const userRef = doc(db, "favorites", user.uid);

  await setDoc(
    userRef,
    { items: arrayUnion(product) },
    { merge: true }
  );
};

// ⬅️ قراءة الفيفوريتس
export const getFavorites = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const userRef = doc(db, "favorites", user.uid);
  const snap = await getDoc(userRef);

  return snap.exists() ? snap.data().items || [] : [];
};

// ⬅️ إضافة منتج للكارت
export const addToCart = async (product) => {
  const user = auth.currentUser;
  if (!user) return alert("Please login first");

  const userRef = doc(db, "cart", user.uid);

  await setDoc(
    userRef,
    { items: arrayUnion(product) },
    { merge: true }
  );
};

// ⬅️ قراءة الكارت
export const getCart = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const userRef = doc(db, "cart", user.uid);
  const snap = await getDoc(userRef);

  return snap.exists() ? snap.data().items || [] : [];
};
