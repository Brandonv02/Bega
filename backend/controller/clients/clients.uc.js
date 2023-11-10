const Clients = require("../../models/clients.model");

exports.newClientUc = async (param) => {
  const newClient = new Clients(param);
  return await newClient.save();
};

exports.find = async (_filter, _options = {}) => {
  const {sort} = _options;
  if (_filter) {
    const query = await Clients.findOne(_filter);
    return query;
  }
  if (sort) query.sort(sort);
  // query.forEach(populate || [], (p) => query.populate(p));
  // return await query.lean().exec();
  const clientes = await Clients.find();
  return clientes;
};

