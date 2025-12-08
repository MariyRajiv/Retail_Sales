import React from 'react';
import dayjs from 'dayjs';

export default function SaleItem({ sale }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 text-sm">{sale.transactionId}</td>
      <td className="p-3 text-sm">{sale.date ? dayjs(sale.date).format('YYYY-MM-DD') : '-'}</td>
      <td className="p-3 text-sm">{sale.customerId}</td>
      <td className="p-3 text-sm">{sale.customerName}</td>
      <td className="p-3 text-sm">{sale.phoneNumber}</td>
      <td className="p-3 text-sm">{sale.gender}</td>
      <td className="p-3 text-sm">{sale.age}</td>
      <td className="p-3 text-sm">{sale.productCategory}</td>
      <td className="p-3 text-sm">{sale.quantity}</td>
    </tr>
  );
}
