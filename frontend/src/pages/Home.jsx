import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import TopFilters from "../components/TopFilters";
import SalesList from "../components/SalesList";
import api from "../services/api";

export default function Home() {
  const [search, setSearch] = useState("");
  const [customerRegion, setCustomerRegion] = useState([]);
  const [gender, setGender] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 25;

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [summary, setSummary] = useState({
    totalUnitsSold: 0,
    totalAmount: 0,
    totalFinalAmount: 0,
    totalDiscount: 0,
  });

  // --------------------------
  // FETCH SALES LIST
  // --------------------------
  const fetchSales = async () => {
    let sortField = "";
    let sortOrder = "";

    if (sortBy) {
      const parts = sortBy.split("_");
      sortField = parts[0].toLowerCase();
      sortOrder = parts[1];
    }

    const res = await api.get("/sales", {
      params: {
        page,
        pageSize,
        search,
        customerRegion: customerRegion.join(","), 
        gender: gender.join(","),
        ageRange: ageRange.join(","),
        productCategory: productCategory.join(","),
        tags: tags.join(","),
        paymentMethod: paymentMethod.join(","),
        startDate,
        endDate,
        sortBy: sortField,
        sortOrder: sortOrder,
      },
    });

    setItems(res.data.results || []);
    setTotalCount(res.data.total || 0);
  };

  // --------------------------
  // FETCH SUMMARY DATA
  // --------------------------
  const fetchSummaryData = async () => {
    const res = await api.get("/sales/summary", {
      params: {
        search,
        customerRegion: customerRegion.join(","),
        gender: gender.join(","),
        ageRange: ageRange.join(","),
        productCategory: productCategory.join(","),
        tags: tags.join(","),
        paymentMethod: paymentMethod.join(","),
        startDate,
        endDate,
      },
    });

    setSummary({
      totalUnitsSold: res.data.totalUnitsSold || 0,
      totalAmount: res.data.totalAmount || 0,
      totalFinalAmount: res.data.totalFinalAmount || 0,
      totalDiscount: res.data.totalDiscount || 0,
    });
  };

  useEffect(() => {
    fetchSales();
    fetchSummaryData();
  }, [
    page,
    search,
    customerRegion,
    gender,
    ageRange,
    productCategory,
    tags,
    paymentMethod,
    startDate,
    endDate,
    sortBy,
  ]);

  const resetAll = () => {
    setSearch("");
    setCustomerRegion([]);
    setGender([]);
    setAgeRange([]);
    setProductCategory([]);
    setTags([]);
    setPaymentMethod([]);
    setStartDate("");
    setEndDate("");
    setSortBy("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-1 p-6 space-y-5">
          <TopFilters
            search={search} setSearch={setSearch}
            customerRegion={customerRegion} setCustomerRegion={setCustomerRegion}
            gender={gender} setGender={setGender}
            ageRange={ageRange} setAgeRange={setAgeRange}
            productCategory={productCategory} setProductCategory={setProductCategory}
            tags={tags} setTags={setTags}
            paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            sortBy={sortBy} setSortBy={setSortBy}
            onReset={resetAll}
          />

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white shadow-sm border rounded-md p-4">
              <div className="text-gray-500 text-sm">Total Units Sold</div>
              <div className="text-2xl font-semibold mt-1">{summary.totalUnitsSold}</div>
            </div>
            <div className="bg-white shadow-sm border rounded-md p-4">
              <div className="text-gray-500 text-sm">Total Amount</div>
              <div className="text-xl mt-1 font-semibold">₹{summary.totalAmount?.toLocaleString()}</div>
            </div>
            <div className="bg-white shadow-sm border rounded-md p-4">
              <div className="text-gray-500 text-sm">Total Discount</div>
              <div className="text-xl mt-1 font-semibold">₹{summary.totalDiscount?.toLocaleString()}</div>
            </div>
          </div>

          {/* SALES TABLE */}
          <SalesList items={items} total={totalCount} page={page} setPage={setPage} pageSize={pageSize} />
        </div>
      </div>
    </div>
  );
}
