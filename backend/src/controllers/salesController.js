const salesService = require('../services/salesService');

exports.getSales = async (req, res) => {
  try {
    // --------------------------
    // Parse query params safely
    // --------------------------
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.min(100, parseInt(req.query.pageSize, 10) || 10);

    let sortBy = (req.query.sortBy || "date").toString();
    let sortOrder = (req.query.sortOrder || "desc").toString();

    // Ensure sortOrder is valid
    if (!["asc", "desc"].includes(sortOrder.toLowerCase())) sortOrder = "desc";

    // --------------------------
    // Normalize string filters
    // --------------------------
    const filters = [
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
    filters.forEach(f => {
      if (req.query[f] !== undefined) params[f] = req.query[f];
    });

    const result = await salesService.querySales({
      params,
      page,
      pageSize,
      sortBy,
      sortOrder
    });

    res.json(result);
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const filters = [
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
    filters.forEach(f => {
      if (req.query[f] !== undefined) params[f] = req.query[f];
    });

    const summary = await salesService.summary(params);
    res.json(summary);
  } catch (err) {
    console.error("Error in getSummary:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
