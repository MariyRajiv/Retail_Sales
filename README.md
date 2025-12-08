Overview:
A Retail Sales Management System with full-text search, multi-select filters, sorting, and pagination. Built with Node.js/Express + MongoDB backend and React (Vite) + Tailwind frontend.

Tech Stack:
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React (Vite), TailwindCSS, Axios
- CSV import: csv-parser

Search Implementation Summary:
- Full-text search implemented via MongoDB text index on `customerName` and `phoneNumber`.
- Debounced frontend input and backend $text query.

Filter Implementation Summary:
- Multi-select filters passed as comma-separated query params.
- Age range parsed as `min-max` and mapped to MongoDB `$gte`/`$lte`.
- Date range passed as `startDate`/`endDate`.

Sorting Implementation Summary:
- Supported sort fields: `date`, `quantity`, `customerName`. Sort order via `sortOrder` param.

Pagination Implementation Summary:
- Page size = 10. Implemented using `skip` and `limit` in MongoDB.
- Backend returns `{ results, total, page, pageSize }` to let frontend compute pages.

Setup Instructions:
1. Start MongoDB and note MONGO_URI.
2. Backend:
   - `cd backend`
   - `npm install`
   - create `.env` with MONGO_URI and CSV_PATH
   - `npm run import-csv`
   - `npm run dev`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
