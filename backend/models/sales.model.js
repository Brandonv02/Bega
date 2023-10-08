const connection = require("../config/connectionbd");

const ventas = new connection.Schema({
  identificacion: {
    unique: [true, "El documento ya existe"],
    require: [true, "El documento es necesario"],
    type: String,
  },
  fecha: {
    type: Date,
    require: true,
  },
  factura: {
    type: String,
    unique: [true, "Factura existe"],
    require: true,
  },
  tipoPago: {
    type: String,
    require: true,
  },
  productos: {
    type: Array,
    require: true,
  },
  estado: {
    type: String,
    require: true,
  },
});

const Sales = connection.model("ventas", ventas);

module.exports = Sales;
