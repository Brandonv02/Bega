const Clients = require("../../models/clients.model");

exports.newClientUc = async (param) => {
  const newClient = new Clients(param);
  return await newClient.save();
};

exports.find = async (_filter, _options = {}) => {
  const {sort, populate} = _options;

  let query = Clients.find();

  if (_filter) {
    query = Clients.findOne(_filter);
  }

  if (sort) {
    query = query.sort(sort);
  }

  if (populate) {
    // Asegúrate de que populate sea un array antes de intentar usar forEach
    if (Array.isArray(populate)) {
      populate.forEach((p) => query.populate(p));
    }
  }

  const result = await query.lean().exec();
  return result;
};

exports.update = async (_filter, _productInfo) => {
  return await Clients.findOneAndUpdate(_filter, _productInfo, {new: true});
};

exports.remove = async (param) => {
  return await Clients.findOneAndDelete(param);
};
