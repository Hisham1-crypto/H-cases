import { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext); // من الكونتكست
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("✅ Logged in successfully");
      navigate("/"); // رجّعه للصفحة الرئيسية
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto p-6 shadow rounded">
      <h2 className="text-2xl font-bold">Login</h2>
      <input type="email" placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
