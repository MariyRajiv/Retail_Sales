require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Sale = require("../models/Sales");
const connectDB = require("./db");
const { parseDMY } = require("./parseDMY"); // <-- IMPORTANT

async function importCSV() {
  await connectDB();

  const filePath = path.resolve(
    __dirname,
    "../../",
    process.env.CSV_PATH || "docs/truestate_assignment_dataset.csv"
  );

  console.log("Importing CSV from", filePath);

  const stream = fs
    .createReadStream(filePath)
    .pipe(csv({ separator: ",", mapHeaders: ({ header }) => header.trim() }));

  let count = 0;
  const batch = [];

  for await (const row of stream) {
    const item = {
      transactionId: row["Transaction ID"] || null,

      // FIXED: Convert dd-mm-yyyy → valid JS date
      date: parseDMY(row.Date),

      customerId: row["Customer ID"],
      customerName: row["Customer Name"],
      phoneNumber: row["Phone Number"],
      gender: row.Gender,
      age: parseInt(row.Age, 10) || null,
      customerRegion: row["Customer Region"],
      customerType: row["Customer Type"],

      productId: row["Product ID"],
      productName: row["Product Name"],
      brand: row.Brand,
      productCategory: row["Product Category"],

      tags:
        typeof row.Tags === "string"
          ? row.Tags.split(",").map((t) => t.trim())
          : [],

      quantity: parseFloat(row.Quantity) || 0,
      pricePerUnit: parseFloat(row["Price per Unit"]) || 0,
      discountPercentage: parseFloat(row["Discount Percentage"]) || 0,
      totalAmount: parseFloat(row["Total Amount"]) || 0,
      finalAmount: parseFloat(row["Final Amount"]) || 0,

      paymentMethod: row["Payment Method"],
      orderStatus: row["Order Status"],
      deliveryType: row["Delivery Type"],
      storeId: row["Store ID"],
      storeLocation: row["Store Location"],

      salespersonId: row["Salesperson ID"],
      employeeName: row["Employee Name"],
    };

    batch.push(item);
    count++;

    if (batch.length >= 1000) {
      await Sale.insertMany(batch, { ordered: false }).catch((e) =>
        console.error("Batch insert error:", e)
      );
      batch.length = 0;
      console.log("Imported", count);
    }
  }

  if (batch.length) {
    await Sale.insertMany(batch, { ordered: false }).catch((e) =>
      console.error("Final batch insert error:", e)
    );
    console.log("Imported final batch");
  }

  console.log("Import complete. Total rows:", count);
  process.exit(0);
}

importCSV().catch((err) => {
  console.error(err);
  process.exit(1);
});
