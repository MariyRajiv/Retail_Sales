const Sale = require('../models/Sales');
const buildQuery = require('../utils/buildQuery');

async function querySales({ params, page, pageSize, sort }) {
  const query = buildQuery(params);

  // --------------------------------------
  // FIELDS CATEGORIES
  // --------------------------------------
  const stringFields = [
    "customerName",
    "productName",
    "productCategory",
    "paymentMethod",
    "gender",
    "customerRegion"
  ];

  // --------------------------------------
  // PROJECTION
  // --------------------------------------
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
    employeeName: 1,
    tags: 1
  };

  const skip = (page - 1) * pageSize;

  // --------------------------------------
  // APPLY COLLATION **IF ANY STRING FIELD IS IN SORT**
  // --------------------------------------
  const sortFields = Object.keys(sort);
  const requiresCollation = sortFields.some(f => stringFields.includes(f));

  let cursor = Sale.find(query, projection);

  if (requiresCollation) {
    cursor = cursor.collation({ locale: "en", strength: 2 });
  }

  cursor = cursor
    .sort(sort)           // ✔ Now multi-sort works
    .skip(skip)
    .limit(pageSize);

  const results = await cursor.exec();
  const total = await Sale.countDocuments(query);

  return { results, total, page, pageSize };
}

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

