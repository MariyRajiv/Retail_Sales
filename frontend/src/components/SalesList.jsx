// src/components/SalesList.jsx
import React from "react";

export default function SalesList({ items, total, page, setPage, pageSize }) {
  return (
    <div className="bg-white shadow-sm border rounded-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* TABLE HEADER */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Transaction ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Phone Number</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Gender</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product Category</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-gray-200">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2">{item.transactionId}</td>
                <td className="px-4 py-2">{new Date(item.date).toISOString().split('T')[0]}</td>
                <td className="px-4 py-2">{item.customerId}</td>
                <td className="px-4 py-2">{item.customerName}</td>
                <td className="px-4 py-2">{item.phoneNumber}</td>
                <td className="px-4 py-2">{item.gender}</td>
                <td className="px-4 py-2">{item.productCategory}</td>
                <td className="px-4 py-2">{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="p-4 flex justify-between items-center">
        <span>
          Page {page} of {Math.ceil(total / pageSize)}
        </span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded-md"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded-md"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(total / pageSize)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
