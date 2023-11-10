const Productos = require("../../models/products.model");

exports.find = async (filter) => {
  console.log(filter, "consulta");
  return await Productos.find({filter});
};

exports.insert = async (param) => {
  const id = param.codigo;
  const consulta = this.find({codigo: id});
  console.log(consulta);
  if (consulta) return await consulta;
  const nuevoproducto = new Productos(param);
  return await nuevoproducto.save();
};

exports.update = async (_filter, _productInfo) => {
  return await Productos.findOneAndUpdate(_filter, _clientInfo, {new: true});
};

exports.remove = async (param) => {
  const id = param._id;
  const response = await Productos.findOneAndDelete(id);
  return response;
};

