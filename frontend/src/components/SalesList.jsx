// src/components/SalesList.jsx
import React from "react";
import Pagination from "./Pagination";

export default function SalesList({ items, total, page, setPage, pageSize }) {
  return (
    <div className="bg-white shadow-sm border rounded-md">
      {/* Outer wrapper gives both scroll axes. max-h controls vertical height. */}
      <div className="w-full overflow-auto max-h-[60vh]">
        {/* Table uses table-auto and min-w-max so columns size to content */}
        <table className="min-w-max w-full table-auto divide-y divide-gray-200">
          {/* TABLE HEADER */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Transaction ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Customer ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Customer Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Phone Number</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Gender</th>

              {/* NEW FIELDS */}
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Age</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Customer Region</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Tags</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Payment Method</th>

              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Product Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Quantity</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-gray-200">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap">{item.transactionId}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {item.date ? new Date(item.date).toISOString().split("T")[0] : ""}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap">{item.customerId}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.customerName}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.phoneNumber}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.gender}</td>

                  {/* NEW CELLS */}
                  <td className="px-4 py-2 whitespace-nowrap">{item.age}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.customerRegion}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {item.tags && item.tags.length > 0 ? item.tags.join(", ") : "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.paymentMethod}</td>

                  <td className="px-4 py-2 whitespace-nowrap">{item.productCategory}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="px-4 py-2 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mb-6 mt-4">
        <Pagination
          page={page}
          total={total}
          pageSize={pageSize}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
