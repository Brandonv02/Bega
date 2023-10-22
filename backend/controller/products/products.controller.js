const {insert, productosUc} = require("./products.uc");

exports.buscarProductos = async (req, res) => {
  const response = await productosUc();
  res.json(response);
};

exports.nuevoProduct = async (req, res) => {
  const param = req.body;
  try {
    const response = await insert(param);
    console.log(response, "CONTROLLER");
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

exports.borrarProducto = async (req, res) => {
  
};

exports.actualizarProducto = async (req, res) => {

};
