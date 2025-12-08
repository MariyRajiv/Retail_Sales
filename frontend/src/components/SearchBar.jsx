import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search name or phone' }) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border rounded px-3 py-2 w-80 text-sm"
      />
    </div>
  );
}
