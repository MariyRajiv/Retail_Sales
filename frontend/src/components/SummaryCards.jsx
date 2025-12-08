import React from 'react';

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="text-sm text-gray-500">Total units sold</div>
        <div className="text-2xl font-semibold">{summary.totalUnitsSold ?? 0}</div>
      </div>
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="text-sm text-gray-500">Total Amount</div>
        <div className="text-2xl font-semibold">₹{(summary.totalAmount ?? 0).toLocaleString()}</div>
      </div>
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="text-sm text-gray-500">Total Discount</div>
        <div className="text-2xl font-semibold">₹{(summary.totalDiscount ?? 0).toLocaleString()}</div>
      </div>
    </div>
  );
}
