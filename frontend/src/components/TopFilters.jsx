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

function Dropdown({ label, options, value = [], onChange, multi = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setOpen(false));

  const handleSelect = (optValue) => {
    if (multi) {
      if (value.includes(optValue)) onChange(value.filter((v) => v !== optValue));
      else onChange([...value, optValue]);
    } else {
      onChange(optValue);
      setOpen(false);
    }
  };

  const displayLabel = () => {
    if (multi) return value.length ? value.join(", ") : label;
    return value || label;
  };

  return (
    <div className="relative flex-1 min-w-[220px]" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-100 px-4 py-2 rounded-md border border-gray-200 shadow-sm flex items-center justify-between text-sm text-gray-700 hover:bg-gray-200 transition"
      >
        {displayLabel()}
        <FiChevronDown className="text-gray-600" />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                multi && value.includes(opt.value) ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {opt.label}
              {multi && value.includes(opt.value) && <span className="ml-2">✔</span>}
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
    <div className="w-full bg-white p-4 rounded-md shadow-sm">

      {/* ====================== ROW 1 ====================== */}
      <div className="flex flex-wrap gap-3 mb-4 w-full">

        {/* RESET */}
        <div className="flex-shrink-0">
          <button
            onClick={onReset}
            className="bg-gray-100 p-2 rounded-md border border-gray-200 hover:bg-gray-200 transition shadow-sm"
          >
            <FiRotateCcw className="text-gray-600" size={18} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex-1 min-w-[260px] relative">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or phone..."
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full bg-gray-100 text-sm focus:outline-none"
          />
        </div>

        {/* OTHER FILTERS */}
        <Dropdown label="Customer Region" options={[
          { label: "East", value: "East" },
          { label: "West", value: "West" },
          { label: "North", value: "North" },
          { label: "South", value: "South" },
          { label: "Central", value: "Central" },
        ]} value={customerRegion} onChange={setCustomerRegion} multi />

        <Dropdown label="Gender" options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]} value={gender} onChange={setGender} multi />

        <Dropdown label="Age Range" options={[
          { label: "18-25", value: "18-25" },
          { label: "26-35", value: "26-35" },
          { label: "36-50", value: "36-50" },
          { label: "50+", value: "50+" },
        ]} value={ageRange} onChange={setAgeRange} multi />

        <Dropdown label="Product Category" options={[
          { label: "Electronics", value: "Electronics" },
          { label: "Clothing", value: "Clothing" },
          { label: "Beauty", value: "Beauty" },
          { label: "Sports", value: "Sports" },
          { label: "Furniture", value: "Furniture" },
          // { label: "Accessory", value: "Accessory" },
        ]} value={productCategory} onChange={setProductCategory} multi />

      </div>

      {/* ====================== ROW 2 ====================== */}
      <div className="flex flex-wrap gap-3 w-full">

        <Dropdown label="Tags" options={[
          { label: "skincare", value: "skincare" },
          { label: "wireless", value: "wireless" },
          { label: "cotton", value: "cotton" },
          { label: "fragrance-free", value: "fragrance-free" },
          { label: "accessory", value: "accessories" },
          { label: "portable", value: "portable" },
          { label: "gadgets", value: "gadgets" },
          { label: "organic", value: "organic" },
          { label: "makeup", value: "makeup" },
          { label: "fashion", value: "fashion" },
          { label: "gaming", value: "gaming" },
        ]} value={tags} onChange={setTags} multi />

        <Dropdown label="Payment Method" options={[
          { label: "UPI", value: "UPI" },
          { label: "Credit Card", value: "Credit Card" },
          { label: "Debit Card", value: "Debit Card" },
          { label: "Cash", value: "Cash" },
          { label: "Net Banking", value: "Net Banking" },
          { label: "Wallet", value: "Wallet" },
        ]} value={paymentMethod} onChange={setPaymentMethod} multi />

        {/* DATE RANGE */}
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <input
            type="date"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-100 px-3 py-2 border border-gray-200 rounded-md text-sm w-full"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-100 px-3 py-2 border border-gray-200 rounded-md text-sm w-full"
          />
        </div>

        {/* SORT */}
        <Dropdown
          label="Sort By"
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
    </div>
  );
}
