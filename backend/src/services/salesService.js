const Sale = require('../models/Sales');
const buildQuery = require('../utils/buildQuery');

async function querySales({ params, page, pageSize, sortBy, sortOrder }) {
  const query = buildQuery(params);

  // --------------------------------------
  // FIELD MAPPING (Frontend → MongoDB)
  // --------------------------------------
  const sortFieldMap = {
    date: "date",
    quantity: "quantity",
    customername: "customerName",
    totalamount: "totalAmount",
    finalamount: "finalAmount",
    age: "age",
  };

  const mongoSortField = sortFieldMap[sortBy?.toLowerCase()] || "date";

  // --------------------------------------
  // SORTING OBJECT
  // --------------------------------------
  const sortConfig = {
    [mongoSortField]: sortOrder === "asc" ? 1 : -1
  };

  // --------------------------------------
  // PAGINATION
  // --------------------------------------
  const skip = (page - 1) * pageSize;

  const results = await Sale.find(query)
    .sort(sortConfig)
    .skip(skip)
    .limit(pageSize)
    .lean();

  const total = await Sale.countDocuments(query);

  return { results, total };
}

async function summary(params) {
  const query = buildQuery(params);

  const data = await Sale.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalUnitsSold: { $sum: "$quantity" },
        totalAmount: { $sum: "$totalAmount" },
        totalFinalAmount: { $sum: "$finalAmount" },
      },
    },
    {
      $project: {
        _id: 0,
        totalUnitsSold: 1,
        totalAmount: 1,
        totalFinalAmount: 1,
        totalDiscount: { $subtract: ["$totalAmount", "$totalFinalAmount"] }, // Correct discount
      },
    },
  ]);

  const result = data[0] || {
    totalUnitsSold: 0,
    totalAmount: 0,
    totalFinalAmount: 0,
    totalDiscount: 0,
  };

  return {
    totalUnitsSold: Math.round(result.totalUnitsSold),
    totalAmount: Math.round(result.totalAmount),
    totalFinalAmount: Math.round(result.totalFinalAmount),
    totalDiscount: Math.round(result.totalDiscount),
  };
}

module.exports = { querySales, summary };
