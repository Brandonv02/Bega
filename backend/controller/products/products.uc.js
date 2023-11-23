const Productos = require("../../models/products.model");

exports.find = async (filter) => {
  return await Productos.find({filter});
};

exports.insert = async (param) => {
  const id = param.codigo;
  const consulta = this.find({codigo: id});
  return await Productos.create(param);
};

exports.update = async (_filter, _productInfo) => {
  return await Productos.findOneAndUpdate(_filter, _productInfo, {new: true});
};

exports.remove = async (param) => {
  console.log(param);
  return await Productos.findOneAndDelete(param);
};

