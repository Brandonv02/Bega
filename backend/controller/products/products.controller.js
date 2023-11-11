const {insert, find, update, remove} = require("./products.uc");

exports.buscarProductos = async (req, res) => {
  const response = await find();
  return response;
};

exports.nuevoProduct = async (req, res) => {
  const param = req.body;
  try {
    const response = await insert(param);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

exports.borrarProducto = async (req, res) => {
  const id = req.body.codigo;
  try {
    const response = await remove({codigo: id});
    res.json(response);
  } catch (error) {
    res.status(error.status);
  }
};

exports.actualizarProducto = async (req, res) => {
  const id = req.body.codigo;
  const data = req.body;
  const response = await update({codigo: id}, data);
  res.json(response);
};
