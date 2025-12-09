const Sale = require('../models/Sales');
const buildQuery = require('../utils/buildQuery');

async function querySales({ params, page, pageSize, sortBy, sortOrder }) {
  const query = buildQuery(params);

  // ------------------------
  // FIELD TYPES
  // ------------------------
  const numericFields = ["quantity", "totalAmount", "finalAmount", "age"];
  const stringFields = ["customerName", "productName", "productCategory", "paymentMethod", "gender", "customerRegion"];
  const dateFields = ["date"];

  let sort = {};

  if (dateFields.includes(sortBy)) {
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
  } else if (numericFields.includes(sortBy)) {
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
  } else if (stringFields.includes(sortBy)) {
    // Use collation for case-insensitive string sorting
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
  } else {
    // Default sort by date descending
    sort.date = -1;
  }

  const projection = {
    transactionId: 1,
    date: 1,
    customerId: 1,
    customerName: 1,
    phoneNumber: 1,
    gender: 1,
    age: 1,
    customerRegion: 1,
    productCategory: 1,
    productName: 1,
    quantity: 1,
    totalAmount: 1,
    finalAmount: 1,
    paymentMethod: 1,
    employeeName: 1
  };

  const skip = (page - 1) * pageSize;

  let cursor;

  if (stringFields.includes(sortBy)) {
    // Case-insensitive string sorting
    cursor = Sale.find(query, projection)
      .collation({ locale: "en", strength: 2 }) // ensures A-Z / a-z treated the same
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
  } else {
    cursor = Sale.find(query, projection)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
  }

  const results = await cursor.exec();
  const total = await Sale.countDocuments(query);

  return { results, total, page, pageSize };
}

// ------------------------
// SUMMARY
// ------------------------
async function summary(params) {
  const query = buildQuery(params);

  const agg = await Sale.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalUnitsSold: { $sum: "$quantity" },
        totalAmount: { $sum: "$totalAmount" },
        totalFinalAmount: { $sum: "$finalAmount" },
        count: { $sum: 1 }
      }
    }
  ]);

  const data = agg[0] || {
    totalUnitsSold: 0,
    totalAmount: 0,
    totalFinalAmount: 0,
    count: 0
  };

  const totalDiscount = data.totalAmount - data.totalFinalAmount;

  return {
    totalUnitsSold: data.totalUnitsSold,
    totalAmount: data.totalAmount,
    totalDiscount,
    count: data.count
  };
}

module.exports = { querySales, summary };
