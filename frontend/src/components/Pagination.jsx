// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ page, setPage, total, pageSize }) {
  const totalPages = Math.min(Math.ceil(total / pageSize), 40316); // limit to 14900 pages

  const goFirst = () => setPage(1);
  const goLast = () => setPage(totalPages);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // 10-page window logic
  const windowSize = 10;
  const currentWindow = Math.floor((page - 1) / windowSize);
  const start = currentWindow * windowSize + 1;
  const end = Math.min(start + windowSize - 1, totalPages);

  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className="flex items-center justify-center space-x-2 text-sm font-medium my-4">
      <button
        onClick={goFirst}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={goPrev}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`px-3 py-1 border rounded ${
            page === num ? "bg-blue-600 text-white" : ""
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={goNext}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={goLast}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Last
      </button>

      <span className="ml-3">| Page {page} of {totalPages}</span>
    </div>
  );
}

