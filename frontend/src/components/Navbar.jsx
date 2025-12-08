import React from "react";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="w-full bg-[#0A3A67] text-white px-6 py-4 shadow-md flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2620/2620308.png"
          className="w-8 h-8"
        />
        <h1 className="text-xl font-semibold tracking-wide">
          TruEstate <span className="font-light">Retail Sales</span>
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <FiUser size={20} />
        <span className="text-sm">Hello, User</span>
      </div>
    </div>
  );
}
