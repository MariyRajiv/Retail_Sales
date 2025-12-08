# Architecture Document

## Backend
- Node.js + Express
- MongoDB for storage (sales collection)
- CSV import script (streaming using csv-parser)
- API endpoints:
  - GET /api/sales -> search, filters, sort, pagination
  - GET /api/summary -> aggregated metrics for current filter+search

## Frontend
- React (Vite) + TailwindCSS
- Components:
  - Navbar, Sidebar, FiltersSideBar, SummaryCards, SalesList, Pagination, SearchBar, SortDropdown
- State:
  - Single source of truth in Home page: filters, search, sort, page
  - Debounced text search to backend

## Data Flow
1. Frontend builds query params (search, multi filters, date range, sort, page).
2. Frontend calls GET /api/sales (and /api/summary) with same params.
3. Backend translates query params into MongoDB query using service layer.
4. Backend returns results + total count; frontend renders and paginates.

## Folder structure
See repository root. Follows TruEstate assignment structure.

