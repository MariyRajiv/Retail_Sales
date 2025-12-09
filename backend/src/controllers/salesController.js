const salesService = require('../services/salesService');

exports.getSales = async (req, res) => {
  try {
    console.log("RAW QUERY:", req.query);

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.min(100, parseInt(req.query.pageSize, 10) || 10);

    // -----------------------------
    // SORTING FIX (supports multi)
    // -----------------------------
    let sortParams = [];

    if (req.query.sortBy) {
      sortParams = Array.isArray(req.query.sortBy)
        ? req.query.sortBy
        : req.query.sortBy.split(",");
    }

    let parsedSort = {};

    sortParams.forEach(item => {
      const [field, order] = item.split(":");

      if (!field || !order) return;

      // Convert: Date -> date | CustomerName -> customerName
      const mongoField = field.charAt(0).toLowerCase() + field.slice(1);

      parsedSort[mongoField] = order === "asc" ? 1 : -1;
    });

    // Default sort
    if (Object.keys(parsedSort).length === 0) {
      parsedSort = { date: -1 };
    }

    // -----------------------------
    // Filters
    // -----------------------------
    const filterFields = [
      "search",
      "customerRegion",
      "gender",
      "ageRange",
      "productCategory",
      "tags",
      "paymentMethod",
      "startDate",
      "endDate"
    ];

    const params = {};
    filterFields.forEach(f => {
      if (req.query[f] !== undefined) {
        params[f] = req.query[f].includes(",")
          ? req.query[f].split(",")
          : req.query[f];
      }
    });

    const result = await salesService.querySales({
      params,
      page,
      pageSize,
      sort: parsedSort
    });

    res.json(result);

  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getSummary = async (req, res) => {
  try {
    const fields = [
      "search",
      "customerRegion",
      "gender",
      "ageRange",
      "productCategory",
      "tags",
      "paymentMethod",
      "startDate",
      "endDate"
    ];

    const params = {};
    fields.forEach(f => {
      if (req.query[f] !== undefined) {
        params[f] = req.query[f].includes(",")
          ? req.query[f].split(",")
          : req.query[f];
      }
    });

    const summary = await salesService.summary(params);
    res.json(summary);

  } catch (err) {
    console.error("Error in getSummary:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
