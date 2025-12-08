const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    transactionId: String,
    date: Date,
    customerId: String,
    customerName: String,
    phoneNumber: String,
    gender: String,
    age: Number,
    customerRegion: String,
    customerType: String,
    productId: String,
    productName: String,
    brand: String,
    productCategory: String,
    tags: [String],
    quantity: Number,
    pricePerUnit: Number,
    discountPercentage: Number,
    totalAmount: Number,
    finalAmount: Number,
    paymentMethod: String,
    orderStatus: String,
    deliveryType: String,
    storeId: String,
    storeLocation: String,
    salespersonId: String,
    employeeName: String,
  },
  { timestamps: true }
);

// Text index for full-text search on customerName and phoneNumber
SaleSchema.index({ customerName: "text", phoneNumber: "text" });

module.exports = mongoose.model("Sale", SaleSchema);
