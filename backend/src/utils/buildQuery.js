// Build MongoDB query from incoming params
function parseCommaList(str) {
  if (!str) return undefined;
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

function buildQuery(params) {
  const query = {};

  // --------- Helper to convert CSV -> array ----------
  const parseList = (val) =>
    typeof val === "string"
      ? val.split(",").map((v) => v.trim()).filter((v) => v)
      : [];

  // ---------------- GENDER ----------------
  if (params.gender) {
    const arr = parseList(params.gender);
    if (arr.length) query.gender = { $in: arr };
  }

  // ---------------- AGE ----------------
  if (params.age) {
    const arr = parseList(params.age).map(Number);
    if (arr.length) query.age = { $in: arr };
  }

  // ---------------- PRODUCT CATEGORY ----------------
  if (params.productCategory) {
    const arr = parseList(params.productCategory);
    if (arr.length) query.productCategory = { $in: arr };
  }

  // ---------------- TAGS (FINAL FIX) ----------------
  if (params.tags) {
    const arr = parseList(params.tags);

    if (arr.length) {
      query.$or = arr.map((tag) => ({
        tags: { $regex: new RegExp(tag, "i") } // case-insensitive search
      }));
    }
  }

  // ---------------- DATE RANGE ----------------
  if (params.fromDate || params.toDate) {
    query.date = {};
    if (params.fromDate) query.date.$gte = new Date(params.fromDate);
    if (params.toDate) query.date.$lte = new Date(params.toDate);
  }

  return query;
}

module.exports = buildQuery;
