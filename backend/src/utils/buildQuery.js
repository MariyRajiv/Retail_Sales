// Build MongoDB query from incoming params
function parseCommaList(str) {
  if (!str) return undefined;
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

function buildQuery(params) {
  const query = {};

  // search: full-text search on customerName and phoneNumber
// search: case-insensitive match on customerName and phoneNumber
  if (params.search) {
    const searchRegex = new RegExp(params.search, 'i'); // case-insensitive
    query.$or = [
      { customerName: searchRegex },
      { phoneNumber: searchRegex }
    ];
  }


  // Multi-selects
  if (params.customerRegion) {
    const arr = parseCommaList(params.customerRegion);
    if (arr && arr.length) query.customerRegion = { $in: arr };
  }
  if (params.gender) {
    const arr = parseCommaList(params.gender);
    if (arr && arr.length) query.gender = { $in: arr };
  }
  if (params.productCategory) {
    const arr = parseCommaList(params.productCategory);
    if (arr && arr.length) query.productCategory = { $in: arr };
  }
  if (params.tags) {
    const arr = parseCommaList(params.tags);
    if (arr && arr.length) query.tags = { $in: arr };
  }
  if (params.paymentMethod) {
    const arr = parseCommaList(params.paymentMethod);
    if (arr && arr.length) query.paymentMethod = { $in: arr };
  }

  // Age range: e.g. 18-25
  if (params.ageRange) {
    const [min, max] = params.ageRange.split('-').map(x => parseInt(x, 10));
    if (!isNaN(min) && !isNaN(max)) query.age = { $gte: min, $lte: max };
    else if (!isNaN(min)) query.age = { $gte: min };
    else if (!isNaN(max)) query.age = { $lte: max };
  }

  // Date range: startDate, endDate in ISO YYYY-MM-DD
  if (params.startDate || params.endDate) {
    query.date = {};
    if (params.startDate) query.date.$gte = new Date(params.startDate);
    if (params.endDate) {
      // include the whole day
      const d = new Date(params.endDate);
      d.setHours(23,59,59,999);
      query.date.$lte = d;
    }
  }

  return query;
}

module.exports = buildQuery;
