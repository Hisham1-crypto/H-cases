import { Link } from "react-router-dom";
import React from "react";
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";

const Footerr = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-5">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* ✅ Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
            H-<span className="text-[#56cfe1]">Cases</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Premium Cases & Accessories
          </p>
        </div>


        {/* ✅ Socials */}

<div className="flex justify-center gap-4">

  <Link to="https://www.instagram.com/etshcases.eg/" className="text-gray-500 hover:text-pink-600 transition text-xl">
    <BsInstagram />
  </Link>
  <Link to="https://www.tiktok.com/@etshcases.eg?_t=ZS-90hv1RahXDZ&_r=1" className="text-gray-500 hover:text-black transition text-xl">
    <BsTiktok />
  </Link>
</div>
      </div>

      {/* ✅ Divider */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} H-Cases — Developed by{" "}
        <span className="">Hisham Hani</span>
      </div>
    </footer>
  );
};

export default Footerr;
