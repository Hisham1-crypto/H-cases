import { getAuth, signOut } from "firebase/auth";
import app from "./firebase";

const Logout = () => {
  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth).then(() => {
      alert("Logged out ✅");
    }).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default Logout;
