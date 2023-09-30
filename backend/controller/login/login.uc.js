const clients = require("../../models/clients.model");

exports.find = async (_filter, _options = {}) => {
  console.log(_filter);
  const {sort} = _options;
  if (_filter) {
    const query = await clients.findOne(_filter);
    return query;
  }
  if (sort) query.sort(sort);
  // query.forEach(populate || [], (p) => query.populate(p));
  // return await query.lean().exec();
  const clientes = await clients.find();
  return clientes;
};

exports.insert = async (info) => {
  return await clients.create(info);
};

exports.update = async (_filter, _clientInfo) => {
  return await clients.findOneAndUpdate(_filter, _clientInfo, {new: true});
};

exports.remove = async (_id) => {
  const res = await clients.deleteOne(_id);
  return {
    found: res.n,
    deleted: res.deletedCount,
  };
};
