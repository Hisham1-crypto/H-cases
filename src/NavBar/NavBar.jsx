import React, { useContext, useState, useRef, useEffect } from "react";
import { Heart, Search, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { AuthContext } from "../AuthProvider";

const NavBar = ({ onSearch }) => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhonesOpen, setIsPhonesOpen] = useState(false);
  const submenuRef = useRef(null);
  const [submenuHeight, setSubmenuHeight] = useState("0px");

  // ✅ استيت للتحكم في إظهار/إخفاء السيرش بار
  const [showSearch, setShowSearch] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!submenuRef.current) return;
    setSubmenuHeight(isPhonesOpen ? `${submenuRef.current.scrollHeight}px` : "0px");
  }, [isPhonesOpen]);

  return (
    <>
      {/* Navbar */}
      <div
        className="flex items-center justify-between px-6 py-3 fixed top-0 right-0 w-full z-20 
        bg-[#0F172A]/95 text-white shadow-lg backdrop-blur-lg animate-fade-in"
        dir="rtl"
      >
        {/* Right (Logo + Menu) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="hover:scale-110 transition-transform">
            <img
              src="\newwwwwwwwwww logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="animate-fade-in"
            />
          </Link>
        </div>

        {/* Left (Icons + Search) */}
        <div className="flex gap-6 items-center">
{/* Search Icon + Input */}
<div className="relative flex items-center z-50">
  {/* زر البحث */}
  <button
    onClick={() => setShowSearch(prev => !prev)}
    className="p-2 rounded-full hover:bg-white/10 transition-all z-20"
  >
    <Search className="w-6 h-6" />
  </button>

  {/* السيرش نفسه */}
  <div
    className={`absolute left-10 top-0 flex items-center gap-2 bg-white/10 
    rounded-full px-3 py-2 w-64 transition-all duration-500
    ${showSearch ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-64 pointer-events-none"}`}
    style={{ zIndex: showSearch ? 10 : -1 }}
  >
    <Search className="text-gray-200 shrink-0" />
    <input
      className="outline-none flex-1 bg-transparent placeholder-gray-300 text-white"
      type="text"
      placeholder="Search ..."
      onChange={(e) => {
        if (onSearch) onSearch(e.target.value);

        // dynamic direction
        if (/[\u0600-\u06FF]/.test(e.target.value)) {
          e.target.dir = "rtl"; // عربي
        } else {
          e.target.dir = "ltr"; // إنجليزي
        }
      }}
    />
  </div>
</div>


          {/* Favourite */}
          <Link to="/favourites" className="relative group">
            <Heart className="group-hover:text-[#D4AF37] transition-colors" />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all"></span>
          </Link>

          {/* Shopping Bag */}
          <Link to="/shoppingbag" className="flex items-center gap-2 relative group">
            <ShoppingBag className="w-6 h-6 group-hover:text-[#D4AF37] transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-[#D4AF37] text-black px-2 py-0.5 rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all"></span>
          </Link>

       
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 flex" dir="rtl">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 animate-fade-in"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar Content */}
          <div
            className="relative bg-[#1E293B]/95 backdrop-blur-xl w-64 h-full shadow-2xl 
            flex flex-col transform transition-transform duration-500 ease-out translate-x-0 
            animate-slide-in-right text-white"
          >
            {/* Close Button */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Categories */}
            <div className="mt-16 px-6 flex-1">
              <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Categories</h3>
              <ul className="space-y-3 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsPhonesOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full py-1 hover:text-[#D4AF37] transition-colors"
                  >
                    <span>Phone Cases</span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isPhonesOpen ? "rotate-90 text-[#D4AF37]" : "text-gray-300"
                      }`}
                    />
                  </button>

                  {/* Submenu */}
                  <div
                    ref={submenuRef}
                    style={{ maxHeight: submenuHeight }}
                    className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                  >
                    <ul
                      className={`ml-4 mt-2 space-y-2 transition-opacity duration-300 ${
                        isPhonesOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <li><Link to="/babeshark" onClick={toggleSidebar} className="hover:text-[#D4AF37]">Babe Shark</Link></li>
                      <li><Link to="/tigercase" onClick={toggleSidebar} className="hover:text-[#D4AF37]">Tiger Case</Link></li>
                      <li><Link to="/carcase" onClick={toggleSidebar} className="hover:text-[#D4AF37]">Cars Case</Link></li>
                      <li><Link to="/rapscene" onClick={toggleSidebar} className="hover:text-[#D4AF37]">Rap Scene Case</Link></li>
                    </ul>
                  </div>
                </li>

                <li>
                  <Link to="/category/cases" onClick={toggleSidebar} className="hover:text-[#D4AF37]">
                     Airpods cases
                  </Link>
                </li>
                <li>
                  <Link to="/category/accessories" onClick={toggleSidebar} className="hover:text-[#D4AF37]">
                    Pop Socket
                  </Link>
                </li>
              </ul>
            </div>

            {/* Auth Section */}
            <div className="px-6 py-4 border-t border-gray-700">
              {!user ? (
                <Link
                  to="/login"
                  onClick={toggleSidebar}
                  className="block bg-[#D4AF37] text-black px-5 py-2 rounded-full shadow-md hover:bg-yellow-500 transition text-center"
                >
                Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    toggleSidebar();
                  }}
                  className="w-full bg-red-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 transition"
                >
                  Signout({user?.displayName || user?.email})
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
