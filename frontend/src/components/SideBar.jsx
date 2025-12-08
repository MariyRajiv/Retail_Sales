import React from "react";
import { FiHome, FiLayers, FiFileText, FiChevronRight } from "react-icons/fi";

export default function SideBar() {
  return (
    <div className="w-64 bg-white h-screen border-r shadow-sm p-5">

      <div className="flex items-center gap-3 mb-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2620/2620308.png"
          className="w-8 h-8"
        />
        <h2 className="text-xl font-bold text-[#0A3A67]">TruEstate</h2>
      </div>

      <div className="space-y-6">

        <div className="text-xs uppercase text-gray-500">Main</div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <FiHome /> <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <FiLayers /> <span>Sales</span>
        </div>

        <div className="text-xs uppercase text-gray-500 mt-6">Invoices</div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <FiFileText /> <span>Proforma</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <FiChevronRight /> <span>Final</span>
        </div>
      </div>
    </div>
  );
}
