const Sales = require("../../models/sales.model");

exports.findSales = async (_filter, _options = {}) => {
  const {sort} = _options;
  if (_filter) {
    const query = await Sales.findOne(_filter);
    return query;
  }
  if (sort) query.sort(sort);
  // query.forEach(populate || [], (p) => query.populate(p));
  // return await query.lean().exec();
  const sales = await Sales.find();
  return sales;
};

exports.insert = async (info) => {
  return await Sales.create(info);
};

exports.update = async (_filter, _clientInfo) => {
  return await Sales.findOneAndUpdate(_filter, _clientInfo, {new: true});
};

exports.remove = async (id) => {
  const res = await Sales.deleteOne(id);
  return {
    found: res.n,
    deleted: res.deletedCount,
  };
};
