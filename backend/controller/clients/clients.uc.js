const Clients = require("../../models/clients.model");

exports.newClientUc = async (param) => {
  const newClient = new Clients(param);
  return await newClient.save();
};

