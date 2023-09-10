const connection = require("../config/connectionbd");

const ventas = new connection.Schema({
  identificacion: {
    type: String,
    require: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
  factura: {
    type: Number,
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

const sales = connection.model("productos", ventas);

module.exports = sales;
