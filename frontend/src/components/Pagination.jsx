import React from "react";

export default function Pagination({ page, total, pageSize, onChange }) {
   const totalPages = Math.min(Math.ceil(total / pageSize), 14932);
  const groupSize = 10;

  // current group
  const currentGroup = Math.floor((page - 1) / groupSize);
  const start = currentGroup * groupSize + 1;
  const end = Math.min(start + groupSize - 1, totalPages);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onChange(newPage);
    }
  };

  const goToNext = () => {
    if (page < end) {
      goToPage(page + 1);
    } else if (end < totalPages) {
      goToPage(end + 1);
    }
  };

  const goToPrevious = () => {
    if (page > start) {
      goToPage(page - 1);
    } else if (start > 1) {
      goToPage(start - 1);
    }
  };

  const goToFirst = () => goToPage(1);
  const goToLast = () => goToPage(totalPages);

  return (
    <div className="flex items-center space-x-2 mt-4">
      {/* FIRST */}
      <button
        className="px-3 py-1 bg-gray-200 rounded-md"
        onClick={goToFirst}
        disabled={page === 1}
      >
        &lt;&lt;
      </button>

      {/* PREVIOUS */}
      <button
        className="px-3 py-1 bg-gray-200 rounded-md"
        onClick={goToPrevious}
        disabled={page === 1}
      >
        &lt;
      </button>

      {/* PAGE BUTTONS */}
      {Array.from({ length: end - start + 1 }, (_, i) => {
        const num = start + i;
        return (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`px-3 py-1 rounded-md ${
              num === page ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {num}
          </button>
        );
      })}

      {/* NEXT */}
      <button
        className="px-3 py-1 bg-gray-200 rounded-md"
        onClick={goToNext}
        disabled={page === totalPages}
      >
        &gt;
      </button>

      {/* LAST */}
      <button
        className="px-3 py-1 bg-gray-200 rounded-md"
        onClick={goToLast}
        disabled={page === totalPages}
      >
        &gt;&gt;
      </button>

      {/* PAGE INFO */}
      <span className="ml-2 text-gray-600">
        Page {page} of {totalPages}
      </span>
    </div>
  );
}
