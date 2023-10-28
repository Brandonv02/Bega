const {newClientUc, find} = require("./clients.uc");

exports.newClientController = async (req, res) => {
  console.log(req.body);
  const param = req.body;
  const response = await newClientUc(param);
  res.json(response);
};

exports.getClientController = async (req, res) => {
  const id = req.body.identificacion;
  const response = await find({identificacion: id});
  console.log(response);
  return response;
};

