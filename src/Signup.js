import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebase";

const Signup = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully ✅");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 max-w-md mx-auto p-6 shadow rounded">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <input type="email" placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
