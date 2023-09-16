const {newProductsUc, productosUc} = require("./products.uc");

exports.buscarProductoscontroller = async (req, res) => {
  const response = await productosUc();
  res.json(response);
};

exports.nuevoProductController = async (req, res) => {
  const param = req.body;
  const response = await newProductsUc(param);
  console.log(response);
  res.json(response);
};

exports.borrarProductoController = async (req, res) => {

};

exports.actualizarProductoController = async (req, res) => {

};
