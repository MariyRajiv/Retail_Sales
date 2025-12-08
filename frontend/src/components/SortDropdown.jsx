// SortDropdown.jsx
import React from "react";

export default function SortDropdown({ sortBy, sortOrder, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value, sortOrder)}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="date:desc">Date (Newest)</option>
        <option value="date:asc">Date (Oldest)</option>
        <option value="quantity:desc">Quantity (High-Low)</option>
        <option value="quantity:asc">Quantity (Low-High)</option>
        <option value="customerName:asc">Customer Name (A-Z)</option>
        <option value="customerName:desc">Customer Name (Z-A)</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onChange(sortBy.split(":")[0] + ":" + e.target.value, e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
