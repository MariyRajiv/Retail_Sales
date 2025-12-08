const salesService = require('../services/salesService');

exports.getSales = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 15,
      sortBy = "date",
      sortOrder = "desc",
    } = req.query;

    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedPageSize = Math.min(100, parseInt(pageSize, 11));

    const result = await salesService.querySales({
      params: req.query,
      page: parsedPage,
      pageSize: parsedPageSize,
      sortBy,
      sortOrder,
    });

    res.json(result);
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const summary = await salesService.summary(req.query);
    res.json(summary);
  } catch (err) {
    console.error("Error in summary:", err);
    res.status(500).json({ message: "Server error" });
  }
};
