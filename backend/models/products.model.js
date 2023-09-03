const connection = require("../config/connectionbd");

const products = new connection.Schema({
  codigo: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    require: true,
  },
  valor: {
    type: Number,
    require: true,
  },
});

const Productos = connection.model("productos", products);

module.exports = Productos;
