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

function Dropdown({ label, options, value, onChange, multi = true, width = "w-48", onFetchData }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setOpen(false));

  const handleSelect = (optValue) => {
    if (multi) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(optValue)
        ? currentValue.filter(v => v !== optValue)
        : [...currentValue, optValue];
      onChange(newValue);
    } else {
      onChange(optValue);
      setOpen(false);
    }

    // ✅ Trigger data fetch on selection change
    if (onFetchData) onFetchData();
  };

  const displayLabel = () => {
    if (multi) {
      const currentValue = Array.isArray(value) ? value : [];
      return currentValue.length ? currentValue.join(", ") : label;
    }
    return value || label;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-100 px-4 py-2 rounded-md border border-gray-200 shadow-sm flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-200 transition whitespace-nowrap"
      >
        {displayLabel()}
        <FiChevronDown className="text-gray-600" />
      </button>

      {open && (
        <div className={`absolute mt-2 ${width} bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto`}>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                (multi && Array.isArray(value) && value.includes(opt.value)) || (!multi && value === opt.value)
                  ? "bg-gray-200 font-medium"
                  : ""
              }`}
            >
              {opt.label} {((multi && Array.isArray(value) && value.includes(opt.value)) || (!multi && value === opt.value)) && <span className="ml-2">✔</span>}
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
  onReset,
  onFetchData
}) {
  // ✅ fetch data when filters change
  useEffect(() => {
    if (onFetchData) onFetchData();
  }, [
    search, customerRegion, gender, ageRange, productCategory,
    tags, paymentMethod, startDate, endDate, sortBy
  ]);

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
        options={[{ label: "East", value: "East" }, { label: "West", value: "West" }, { label: "North", value: "North" }, { label: "South", value: "South" }, { label: "Central", value: "Central" }]}
        value={customerRegion}
        onChange={setCustomerRegion}
        onFetchData={onFetchData}
      />

      <Dropdown
        label="Gender"
        options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Other", value: "Other" }]}
        value={gender}
        onChange={setGender}
        onFetchData={onFetchData}
      />

      <Dropdown
        label="Age Range"
        options={[{ label: "18-25", value: "18-25" }, { label: "26-35", value: "26-35" }, { label: "36-50", value: "36-50" }, { label: "51-70", value: "51-70" }]}
        value={ageRange}
        onChange={setAgeRange}
        onFetchData={onFetchData}
      />

      <Dropdown
        label="Product Category"
        options={[{ label: "Electronics", value: "Electronics" }, { label: "Clothing", value: "Clothing" }, { label: "Beauty", value: "Beauty" }, { label: "Sports", value: "Sports" }, { label: "Furniture", value: "Furniture" }, { label: "Accessories", value: "Accessories" }]}
        value={productCategory}
        onChange={setProductCategory}
        onFetchData={onFetchData}
      />

      <Dropdown
        label="Tags"
        options={[{ label: "fitness", value: "fitness" }, { label: "wellness", value: "wellness" }, { label: "gaming", value: "gaming" }, { label: "tech", value: "tech" }, { label: "luxury", value: "luxury" }, { label: "accessory", value: "accessory" }, { label: "home", value: "home" }, { label: "storage", value: "storage" }, { label: "organic", value: "organic" }, { label: "makeup", value: "makeup" }, { label: "fashion", value: "fashion" }]}
        value={tags}
        onChange={setTags}
        onFetchData={onFetchData}
      />

      <Dropdown
        label="Payment Method"
        options={[{ label: "UPI", value: "UPI" }, { label: "Credit Card", value: "Credit Card" }, { label: "Debit Card", value: "Debit Card" }, { label: "Cash", value: "Cash" }, { label: "Net Banking", value: "Net Banking" }, { label: "Wallet", value: "Wallet" }]}
        value={paymentMethod}
        onChange={setPaymentMethod}
        onFetchData={onFetchData}
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
          { label: "Date (Newest First)", value: "date:desc" },
          { label: "Date (Oldest First)", value: "date:asc" },
          { label: "Quantity (High-Low)", value: "Quantity:desc" },
          { label: "Quantity (Low-High)", value: "Quantity:asc" },
          { label: "Customer Name (A-Z)", value: "CustomerName:asc" },
          { label: "Customer Name (Z-A)", value: "CustomerName:desc" },
        ]}
        value={sortBy}
        onChange={setSortBy}
        multi={false}
        onFetchData={onFetchData} // ✅ ensure sort triggers fetch
      />
    </div>
  );
}
