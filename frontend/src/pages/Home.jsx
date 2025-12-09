import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import TopFilters from "../components/TopFilters";
import SalesList from "../components/SalesList";
import SummaryCards from "../components/SummaryCards";
import api from "../services/api";

export default function Home() {
  const [search, setSearch] = useState("");
  const [customerRegion, setCustomerRegion] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [tags, setTags] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [summary, setSummary] = useState({
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0
  });

  const tableRef = useRef(null);

  // --------------------------
  // FETCH SALES LIST
  // --------------------------
  const fetchSales = async () => {
    let sortField = "";
    let sortOrder = "";

    if (sortBy) {
      const parts = sortBy.split("_");
      const fieldMap = {
        Date: "date",
        Quantity: "quantity",
        CustomerName: "customerName"
      };
      sortField = fieldMap[parts[0]] || "date";
      sortOrder = parts[1] || "asc";
    }

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
        sortBy: sortField,
        sortOrder: sortOrder,
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

    setSummary({
      totalUnitsSold: Math.round(res.data.totalUnitsSold || 0),
      totalAmount: Math.round(res.data.totalAmount || 0),
      totalDiscount: Math.round(res.data.totalDiscount || 0),
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
    setCustomerRegion("");
    setGender("");
    setAgeRange("");
    setProductCategory("");
    setTags("");
    setPaymentMethod("");
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
          <SummaryCards summary={summary} />

          {/* SALES TABLE */}
          <div ref={tableRef} className="overflow-hidden">
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
