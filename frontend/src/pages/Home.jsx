import React, { useEffect, useState, useRef } from "react";

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

  // SORT FIX — use string "field:order"
const [sortBy, setSortBy] = useState([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [totalUnits, setTotalUnits] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const tableRef = useRef(null);

  // --------------------------
  // FETCH SALES LIST
  // --------------------------
  const fetchSales = async () => {
    const res = await api.get("/sales", {
      params: {
        page,
        pageSize,
        search,
        customerRegion,
        gender,
        ageRange,
        productCategory,
        tags,
        paymentMethod,
        startDate,
        endDate,

        // FIX: send sortBy directly ex: "date:asc"
        sortBy: sortBy.join(","), 
      },
    });

    setItems(res.data.results || []);
    setTotalCount(res.data.total || 0);

    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --------------------------
  // FETCH SUMMARY DATA
  // --------------------------
  const fetchSummaryData = async () => {
    const res = await api.get("/sales/summary", {
      params: {
        search,
        customerRegion,
        gender,
        ageRange,
        productCategory,
        tags,
        paymentMethod,
        startDate,
        endDate,
      },
    });

    setTotalUnits(res.data.totalUnitsSold || 0);
    setTotalAmount(res.data.totalAmount || 0);
    setTotalDiscount(res.data.totalDiscount || 0);
  };

  // --------------------------
  // EFFECT
  // --------------------------
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

  // --------------------------
  // RESET ALL FILTERS
  // --------------------------
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
    setSortBy("date:desc");
    setPage(1);
  };

  return (
   <div className="min-h-screen bg-gray-100 flex flex-col">


  <div className="flex flex-row flex-1">
    {/* Sidebar */}
    <div className="flex-shrink-0 w-45">
      <Sidebar />
    </div>

    {/* Main content */}
    <div className="flex-1 flex flex-col overflow-x-auto p-6 space-y-5">
      {/* Filters */}
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
        onFetchData={fetchSales}
        onReset={resetAll}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 min-w-max">
        <div className="bg-white shadow-sm border rounded-md p-4">
          <div className="text-gray-500 text-sm">Total Units Sold</div>
          <div className="text-2xl font-semibold mt-1">{totalUnits}</div>
        </div>

        <div className="bg-white shadow-sm border rounded-md p-4">
          <div className="text-gray-500 text-sm">Total Amount</div>
          <div className="text-xl mt-1 font-semibold">
            ₹{totalAmount?.toLocaleString()}
          </div>
        </div>

        <div className="bg-white shadow-sm border rounded-md p-4">
          <div className="text-gray-500 text-sm">Total Discount</div>
          <div className="text-xl mt-1 font-semibold">
            ₹{totalDiscount?.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} className="overflow-x-auto">
        <SalesList
          items={items}
          total={totalCount}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  </div>
</div>

  );
}

