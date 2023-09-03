const {newProductsUc, productos} = require("./products.uc");

exports.buscarProductos = async (req, res) => {
  const response = await productos();
  res.json(response);
};

exports.newProductController = async (req, res) => {
  const param = req.body;
  const response = await newProductsUc(param);
  console.log(response);
  res.json(response);
};

