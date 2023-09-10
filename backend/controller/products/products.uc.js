const Productos = require("../../models/products.model");

exports.productosUc = async () => {
  const productos = await Productos.find();
  return productos;
};

exports.newProductsUc = async (param) => {
  const nuevoproducto = new Productos(param);
  return await nuevoproducto.save();
};


