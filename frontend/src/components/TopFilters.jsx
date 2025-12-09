// src/components/TopFilters.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiRotateCcw, FiChevronDown, FiSearch } from "react-icons/fi";

function useOutsideClick(ref, callback) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
}

function Dropdown({ label, options, value, onChange, width = "w-48" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-100 px-4 py-2 rounded-md border border-gray-200 shadow-sm flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-200 transition whitespace-nowrap"
      >
        {value ? options.find(o => o.value === value)?.label || value : label}
        <FiChevronDown className="text-gray-600" />
      </button>

      {open && (
        <div className={`absolute mt-2 ${width} bg-white border border-gray-200 rounded-md shadow-lg z-50`}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopFilters({
  search, setSearch,
  customerRegion, setCustomerRegion,
  gender, setGender,
  ageRange, setAgeRange,
  productCategory, setProductCategory,
  tags, setTags,
  paymentMethod, setPaymentMethod,
  startDate, setStartDate,
  endDate, setEndDate,
  sortBy, setSortBy,
  onReset
}) {
  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm flex flex-wrap gap-3 items-center">

      {/* RESET BUTTON */}
      <button
        onClick={onReset}
        className="bg-gray-100 p-2 rounded-md border border-gray-200 hover:bg-gray-200 transition shadow-sm"
      >
        <FiRotateCcw className="text-gray-600" size={18} />
      </button>

      {/* SEARCH BAR */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name or phone..."
          className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-72 bg-gray-100 text-sm focus:outline-none"
        />
      </div>

      {/* FILTER DROPDOWNS */}
      <Dropdown
        label="Customer Region"
        options={[
          { label: "East", value: "East" },
          { label: "West", value: "West" },
          { label: "North", value: "North" },
          { label: "South", value: "South" },
          { label: "Central", value: "Central" },
        ]}
        value={customerRegion}
        onChange={setCustomerRegion}
      />

      <Dropdown
        label="Gender"
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
        value={gender}
        onChange={setGender}
      />

      <Dropdown
        label="Age Range"
        options={[
          { label: "18-25", value: "18-25" },
          { label: "26-35", value: "26-35" },
          { label: "36-50", value: "36-50" },
          { label: "50+", value: "50+" },
        ]}
        value={ageRange}
        onChange={setAgeRange}
      />

      <Dropdown
        label="Product Category"
        options={[
          { label: "Electronics", value: "Electronics" },
          { label: "Clothing", value: "Clothing" },
          { label: "Beauty", value: "Beauty" },
          { label: "Sports", value: "Sports" },
          { label: "Furniture", value: "Furniture" },
          { label: "Accessories", value: "Accessories" },
        ]}
        value={productCategory}
        onChange={setProductCategory}
      />

      <Dropdown
        label="Tags"
        options={[
          { label: "fitness", value: "fitness" },
          { label: "wellness", value: "wellness" },
          { label: "gaming", value: "gaming" },
          { label: "tech", value: "tech" },
          { label: "luxury", value: "luxury" },
          { label: "accessory", value: "accessory" },
          { label: "home", value: "home" },
          { label: "storage", value: "storage" },
          { label: "organic", value: "organic" },
          { label: "makeup", value: "makeup" },
          { label: "fashion", value: "fashion" },
        ]}
        value={tags}
        onChange={setTags}
      />

      <Dropdown
        label="Payment Method"
        options={[
          { label: "UPI", value: "UPI" },
          { label: "Credit Card", value: "Credit Card" },
          { label: "Debit Card", value: "Debit Card" },
          { label: "Cash", value: "Cash" },
          { label: "Net Banking", value: "Net Banking" },
          { label: "Wallet", value: "Wallet" },
        ]}
        value={paymentMethod}
        onChange={setPaymentMethod}
      />

      {/* DATE RANGE */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate || ""}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-100 px-3 py-2 border border-gray-200 rounded-md text-sm"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-100 px-3 py-2 border border-gray-200 rounded-md text-sm"
        />
      </div>

      {/* SORTING */}
      <Dropdown
        label="Sort By"
        width="w-56"
        options={[
          { label: "Date (Newest First)", value: "Date_desc" },
          { label: "Date (Oldest First)", value: "Date_asc" },
          { label: "Quantity (High-Low)", value: "Quantity_desc" },
          { label: "Quantity (Low-High)", value: "Quantity_asc" },
          { label: "Customer Name (A-Z)", value: "CustomerName_asc" },
          { label: "Customer Name (Z-A)", value: "CustomerName_desc" },
        ]}
        value={sortBy}
        onChange={setSortBy}
      />
    </div>
  );
}
