// src/components/SalesList.jsx
import React from "react";
import Pagination from "./Pagination";

export default function SalesList({ items, total, page, setPage, pageSize }) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="bg-white shadow-sm border rounded-md flex flex-col">

  {/* Horizontal scroll container */}
  <div className="overflow-x-auto">
    {/* Vertical scroll container */}
    <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
      <table className="min-w-[1200px] divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50 sticky top-0 z-20">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[120px]">Transaction ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[120px]">Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[60px]">Age</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[120px]">Customer Region</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[120px]">Customer ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[150px]">Customer Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[140px]">Phone Number</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[80px]">Gender</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[150px]">Product Category</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[150px]">Employee Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 min-w-[80px]">Quantity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2">{item.transactionId}</td>
                <td className="px-4 py-2">{item.date ? new Date(item.date).toISOString().split("T")[0] : ""}</td>
                <td className="px-4 py-2">{item.age}</td>
                <td className="px-4 py-2">{item.customerRegion}</td>
                <td className="px-4 py-2">{item.customerId}</td>
                <td className="px-4 py-2">{item.customerName}</td>
                <td className="px-4 py-2">{item.phoneNumber}</td>
                <td className="px-4 py-2">{item.gender}</td>
                <td className="px-4 py-2">{item.productCategory}</td>
                <td className="px-4 py-2">{item.employeeName}</td>
                <td className="px-4 py-2">{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} className="px-4 py-2 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* Pagination */}
  <div className="p-4 flex justify-center">
    <Pagination
      page={page}
      setPage={setPage}
      total={total}
      pageSize={pageSize}
    />
  </div>
</div>

  );
}
