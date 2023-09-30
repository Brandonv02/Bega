const sales = require("../../models/sales.model");

exports.find = async (_filter, _options = {}) => {
  const {sort} = _options;
  const query = await sales.findOne(_filter);
  if (query) {
    return "Ya con el ID";
  }
  if (sort) query.sort(sort);
  // query.forEach(populate || [], (p) => query.populate(p));
  // return await query.lean().exec();
  const productos = await sales.find();
  return productos;
};

exports.insert = async (info) => {
  return await sales.create(info);
};

exports.update = async (_filter, _clientInfo) => {
  return await sales.findOneAndUpdate(_filter, _clientInfo, {new: true});
};

exports.remove = async (_id) => {
  console.log(_id);
  const res = await sales.deleteOne({_id: _id});
  return {
    found: res.n,
    deleted: res.deletedCount,
  };
};
