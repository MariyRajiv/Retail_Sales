// Build MongoDB query from incoming params
function buildQuery(params) {
  const query = {};

  // Master AND container (so multiple OR groups don't overwrite each other)
  let andConditions = [];

  // -----------------------------
  // SEARCH (customerName or phone)
  // -----------------------------
  if (params.search) {
    const searchRegex = new RegExp(params.search, "i");

    // push search OR block into AND
    andConditions.push({
      $or: [
        { customerName: searchRegex },
        { phoneNumber: searchRegex }
      ]
    });
  }

  // -----------------------------
  // MULTI-SELECT FILTERS
  // -----------------------------
  const multiSelectFields = ["customerRegion", "gender", "productCategory", "tags", "paymentMethod"];

  multiSelectFields.forEach(field => {
    if (params[field] && params[field].length) {
      if (field === "tags" || field === "productCategory") {
        const regexArr = params[field].map(v => new RegExp(`^${v}$`, "i"));
        query[field] = { $in: regexArr };
      } else {
        query[field] = { $in: params[field] };
      }
    }
  });

  // -----------------------------
  // AGE RANGE (supports multiple)
  // -----------------------------
  if (params.ageRange && params.ageRange.length) {
    const orConditions = [];

    params.ageRange.forEach(r => {
      const [min, max] = r.split("-").map(x => parseInt(x, 10));

      if (!isNaN(min) && !isNaN(max)) {
        orConditions.push({ age: { $gte: min, $lte: max } });
      } else if (!isNaN(min)) {
        orConditions.push({ age: { $gte: min } });
      } else if (!isNaN(max)) {
        orConditions.push({ age: { $lte: max } });
      }
    });

    if (orConditions.length) {
      andConditions.push({ $or: orConditions });
    }
  }

  // -----------------------------
  // DATE RANGE
  // -----------------------------
  if (params.startDate || params.endDate) {
    query.date = {};
    if (params.startDate) query.date.$gte = new Date(params.startDate);
    if (params.endDate) {
      const d = new Date(params.endDate);
      d.setHours(23, 59, 59, 999);
      query.date.$lte = d;
    }
  }

  // -----------------------------
  // APPLY $and IF NEEDED
  // -----------------------------
  if (andConditions.length) {
    query.$and = andConditions;
  }

  return query;
}

module.exports = buildQuery;
