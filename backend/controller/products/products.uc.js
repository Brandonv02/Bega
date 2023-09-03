const Productos = require("../../models/products.model");

exports.newProductsUc = async (param) => {
  const nuevoproducto = new Productos(param);
  return await nuevoproducto.save();
};

exports.productos = async () => {
  const productos = await Productos.find();
  return productos;
};

