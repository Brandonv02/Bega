const user = require("../../models/users.model");

exports.find = async (_filter, _options = {}) => {
  const {sort} = _options;
  if (_filter) {
    const query = await user.findOne(_filter);
    return query;
  }
  if (sort) query.sort(sort);
  // query.forEach(populate || [], (p) => query.populate(p));
  // return await query.lean().exec();
  const users = await user.find();
  return users;
};

exports.insert = async (info) => {
  return await user.create(info);
};

exports.update = async (_filter, _clientInfo) => {
  return await user.findOneAndUpdate(_filter, _clientInfo, {new: true});
};

exports.remove = async (param) => {
  return await user.findOneAndDelete(param);
};
