const {newClientUc} = require("./clients.uc");

exports.newClientController = async (req, res) => {
  console.log(req.body);
  const param = req.body;
  const response = await newClientUc(param);
  res.json(response);
};


