const clients = require("../../models/clients.model");

exports.loginUc = async () => {
  const productos = await clients.find();
  return productos;
};
