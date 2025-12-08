# chatsales - Backend

## Setup
1. Copy `.env` and fill `MONGO_URI` and `CSV_PATH`.
2. `npm install`
3. Start MongoDB locally or use Atlas.
4. Import dataset:
   `npm run import-csv`
5. Run server:
   `npm run dev`

API:
- GET /api/sales
  - query params:
    - search (string)
    - customerRegion (comma-separated)
    - gender (comma-separated)
    - ageRange (e.g. 18-25)
    - productCategory (comma-separated)
    - tags (comma-separated)
    - paymentMethod (comma-separated)
    - startDate, endDate (YYYY-MM-DD)
    - sortBy (date|quantity|customerName)
    - sortOrder (asc|desc)
    - page, pageSize

- GET /api/sales/summary
  - same query params
