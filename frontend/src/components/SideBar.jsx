import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiInbox,
  FiChevronDown,
  FiChevronRight,
  FiCopy,
  FiPlayCircle,
  FiXCircle,
  FiCheckCircle,
} from "react-icons/fi";

export default function Sidebar() {
  const [openServices, setOpenServices] = useState(true);
  const [openInvoices, setOpenInvoices] = useState(true);

  return (
    <div className="w-[200px] flex-shrink-0 bg-gray-90 h-screen p-3 pt-5 text-gray-700 ml-1">


      {/* TOP — LOGO + NAME */}
      <div className="flex items-center gap-3 px-1 mb-6 bg-white px-4 py-2 rounded">
        <div className="bg-black rounded-md p-2">
          <img src="/profile.png" alt="Profile"

          className="w-8 h-8"
        />
        </div>
        <div>
          <h2 className="text-sm font-semibold">Vault</h2>
          <p className="text-xs text-gray-500 -mt-1">Anurag Yadav</p>
        </div>
      </div>

      {/* MAIN MENU ITEMS */}
      <div className="space-y-1">

        <div className="menu-item">
          <FiHome size={16} />
          <span>Dashboard</span>
        </div>

        <div className="menu-item">
          <FiUsers size={16} />
          <span>Nexus</span>
        </div>

        <div className="menu-item">
          <FiInbox size={16} />
          <span>Intake</span>
        </div>

        {/* SERVICES SECTION */}
        <div className="mt-3 bg-white rounded">
          <div
            className="menu-expand"
            onClick={() => setOpenServices(!openServices)}
          >
            <div className="flex items-center gap-3">
              <FiCopy size={16} />
              <span className="font-medium">Services</span>
            </div>
            {openServices ? <FiChevronDown /> : <FiChevronRight />}
          </div>

          {openServices && (
            <div className="section-box">

              <div className="sub-item">
                <FiPlayCircle size={16} className="text-gray-700" />
                <span>Pre-active</span>
              </div>

              <div className="sub-item">
                <FiCopy size={16} className="text-gray-700" />
                <span>Active</span>
              </div>

              <div className="sub-item">
                <FiXCircle size={16} className="text-gray-700" />
                <span>Blocked</span>
              </div>

              <div className="sub-item">
                <FiCheckCircle size={16} className="text-gray-700" />
                <span>Closed</span>
              </div>
            </div>
          )}
        </div>

        {/* INVOICES SECTION */}
        <div className="mt-3 bg-white rounded">
          <div
            className="menu-expand"
            onClick={() => setOpenInvoices(!openInvoices)}
          >
            <div className="flex items-center gap-3">
              <FiCopy size={16} />
              <span className="font-medium">Invoices</span>
            </div>
            {openInvoices ? <FiChevronDown /> : <FiChevronRight />}
          </div>

          {openInvoices && (
            <div className="section-box">

              <div className="sub-item ">
                <FiCopy size={16} />
                <span>Proforma Invoices</span>
              </div>

              <div className="sub-item">
                <FiCheckCircle size={16} />
                <span>Final Invoices</span>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
