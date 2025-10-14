import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Heart,
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ShoppingCart,
  User,
  ChevronDown,
  User2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { AuthContext } from "../AuthProvider";
import { FavoritesContext } from "../FavoritesProvider";

const NavBar = ({ onSearch }) => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhonesOpen, setIsPhonesOpen] = useState(false);
  const submenuRef = useRef(null);
  const [submenuHeight, setSubmenuHeight] = useState("0px");

  const [showSearch, setShowSearch] = useState(false);
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserDrawer = () => setIsUserDrawerOpen(!isUserDrawerOpen);

  useEffect(() => {
    if (!submenuRef.current) return;
    setSubmenuHeight(isPhonesOpen ? `${submenuRef.current.scrollHeight}px` : "0px");
  }, [isPhonesOpen]);

  const handleLogout = () => {
    logout();
    toggleUserDrawer();
  };

  return (
  <>
  {/* 🔹 الشريط الثابت فوق */}
  <div className="fixed top-0 left-0 w-full bg-[#56cfe1] text-white text-xs sm:text-sm font-medium py-2 text-center z-40">
    🎉  20% OFF on any order for our new website 
  </div>

  {/* 🔹 الشريط المتحرك تحت */}
  <div className="fixed top-8 left-0 w-full bg-black text-white text-sm sm:text-base font-light py-2 overflow-hidden z-30">
    <div className="marquee-container">
      <div className="marquee-content">
        🚚 Any order above <span className="font-semibold">500 pounds</span> shipping is free.
      </div>
      <div className="marquee-content">
        🚚 Any order above <span className="font-semibold">500 pounds</span> shipping is free.
      </div>
    </div>
  </div>

    
      {/* Navbar */}
     <div
  className="flex flex-row-reverse items-center justify-between px-4 sm:px-6 py-3 fixed top-[3rem] right-0 w-full z-20 
  bg-white text-grey shadow-lg animate-fade-in"
  dir="rtl"
>

        {/* ✅ Menu Icon (للموبايل فقط) */}
        <button
          className="block md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* ✅ Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:scale-110 transition-transform">
            <img
              src="\logo_transparent.png"
              alt="Logo"
              width={90}
              height={90}
              className="animate-fade-in"
            />
          </Link>
        </div>

        {/* ✅ Center Links (تختفي في الموبايل) */}
        <div className="hidden md:flex flex-row-reverse flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-700 font-light text-sm relative">
          <div className="relative group">
            <button
              onClick={() => setIsPhonesOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-[#56cfe1] transition"
            >
              Phone Cover
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isPhonesOpen ? "rotate-180 text-[#56cfe1]" : "text-gray-600"
                }`}
              />
            </button>

            <div
              className={`absolute top-6 right-0 bg-white shadow-lg rounded-lg py-2 w-40 transition-all duration-300 z-50 ${
                isPhonesOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-3 pointer-events-none"
              }`}
            >
              <Link to="/babeshark" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                Babe Shark 
              </Link>
              <Link to="/tigercase" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                Tiger 
              </Link>
              <Link to="/lvcase" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                LV 
              </Link>
              <Link to="/evileeye" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
              Evile Eye 
              </Link>
               <Link to="/porsche911" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
              Porsche 911
              </Link>
                <Link to="/luficase" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
              Lufi 
              </Link>
                 <Link to="/labubu" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                Labubu
                </Link>
            </div>
          </div>

          <Link to="/laptopsleeve" className="hover:text-[#56cfe1] transition">Laptop Sleeve</Link>
          <Link to="/funnybag" className="hover:text-[#56cfe1] transition">Funny bag</Link>
          <Link to="/minibag" className="hover:text-[#56cfe1] transition">Mini bag</Link>

        </div>

        {/* ✅ Left Icons */}
        <div className="flex flex-row-reverse gap-4 sm:gap-6 items-center">
          {/* Search */}
{/* Search Icon */}
<div className="relative flex items-center z-50">
  <button
    onClick={() => setShowSearch((prev) => !prev)}
    className="p-2 rounded-full hover:bg-gray-100 transition-all"
  >
    <Search className="w-6 h-6 text-gray-700 hover:text-[#56cfe1]" strokeWidth={1} />
  </button>

  {/* Search Bar */}
  <div
    className={`fixed top-20 right-4 mt-10 sm:mt-0 left-4 mx-auto bg-white shadow-md rounded-full flex items-center px-3 py-2 
    transition-all duration-500 md:absolute md:top-0 md:right-12 md:left-auto md:w-[200px]
    ${showSearch ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
  >
    <input
      className="outline-none flex-1 bg-transparent placeholder-gray-400 text-gray-800 text-sm"
      type="text"
      placeholder="Search..."
      onChange={(e) => {
        if (onSearch) onSearch(e.target.value);
        if (/[\u0600-\u06FF]/.test(e.target.value)) e.target.dir = 'rtl';
        else e.target.dir = 'ltr';
      }}
    />
  </div>
</div>

          {/* User */}
          <button onClick={toggleUserDrawer} className="hidden md:block">
            <User className="hover:text-[#56cfe1] hover:scale-110" strokeWidth={1} />
          </button>

          {/* Wishlist */}
          <Link to="/favourites" className="relative group">
            <Heart className="group-hover:text-[#56cfe1] transition hover:scale-110" strokeWidth={1} />
            <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white px-1 py-0.2 rounded-full">
              {favorites.length}
            </span>
          </Link>

          {/* Cart */}
          <Link to="/shoppingbag" className="relative group">
            <ShoppingCart className="w-6 h-6 group-hover:text-[#56cfe1] transition hover:scale-110" strokeWidth={1} />
            <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white px-1 py-0.2 rounded-full">
              {cart.length}
            </span>
          </Link>
        </div>

        {/* ✅ Sidebar (Menu Drawer للموبايل) */}
       <div
  className={`fixed top-[4rem] right-0 w-64 h-full bg-white shadow-2xl transform transition-transform duration-500 z-50 ${
    isSidebarOpen ? "translate-x-0" : "translate-x-full"
  }`}
>

          <div className="flex flex-col gap-4 p-6 text-right">
            {/* Close Icon */}
            <button onClick={toggleSidebar} className="self-start">
              <X className="w-6 h-6 text-gray-700 hover:text-[#56cfe1]" />
            </button>

            {/* Links */}
            <div className="relative group">
              <button
                onClick={() => setIsPhonesOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-[#56cfe1] transition"
              >
                Phone Cover
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isPhonesOpen ? "rotate-180 text-[#56cfe1]" : "text-gray-600"
                  }`}
                />
              </button>

              <div
                className={`absolute top-6 right-0 bg-white shadow-lg rounded-lg py-2 w-40 transition-all duration-300 z-50 ${
                  isPhonesOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
              >
                <Link to="/babeshark" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                  Babe Shark
                </Link>
                <Link to="/tigercase" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                  Tiger 
                </Link>
                <Link to="/lvcase" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                  LV 
                </Link>
                <Link to="/evileeye" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                Evile eye    
                </Link>
                     <Link to="/porsche911" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                Porsche 911   
                </Link>
                   <Link to="/luficase" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                Lufi
                </Link>
                 <Link to="/labubu" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#56cfe1] text-right">
                Labubu
                </Link>
              </div>
            </div>

            {/* <Link to="/tigercase" onClick={toggleSidebar} className="hover:text-[#56cfe1]">Tiger Case</Link> */}
            <Link to="/laptopsleeve" onClick={toggleSidebar} className="hover:text-[#56cfe1]">Laptop sleeve</Link>
            <Link to="/funnybag" onClick={toggleSidebar} className="hover:text-[#56cfe1]">Funny bag</Link>
            <Link to="/minibag" onClick={toggleSidebar} className="hover:text-[#56cfe1]">Mini bag</Link>

            {/* ✅ User Icon (تحت اللينكات) */}
            <button
              onClick={() => {
                toggleUserDrawer();
                toggleSidebar();
              }}
              className="flex items-center justify-end gap-2 mt-6 text-gray-700 hover:text-[#56cfe1]"
            >
              <User className="w-5 h-5" />
              <span>User</span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ User Drawer */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-2xl transform transition-transform duration-500 z-[60] ${
          isUserDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-between h-full p-6">
          <button
            onClick={toggleUserDrawer}
            className="self-end text-gray-500 hover:text-gray-800 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-semibold shadow-inner">
              <User2/>
            </div>
           <h2 className="text-lg font-semibold text-gray-800">
  {user ? user.displayName || user.name || "Guest" : "Guest"}
</h2>
            <p className="text-sm text-gray-500">
              {user ? "Welcome back!" : "Login to save your wishlist & cart"}
            </p>
          </div>

          <div className="w-full mt-auto">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-black text-white py-2 rounded-full shadow-md hover:from-red-500 hover:to-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  toggleUserDrawer();
                  navigate("/login");
                }}
                className="w-full bg-gradient-to-r from-[#56cfe1] to-[#48bfe3] text-white py-2 rounded-full shadow-md hover:from-[#48bfe3] hover:to-[#56cfe1] transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
