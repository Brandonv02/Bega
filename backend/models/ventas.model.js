

const ventas = new Schema({
  idVenta: {
    type: Number,
    require: true,
  },
  idIdentificacion: {
    type: Number,
    require: true,
  },
  idProducto: {
    type: Number,
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
  nombreCliente: {
    type: String,
    require: true,
  },
  correo: {
    type: String,
    require: true,
  },
  telefono: {
    type: Number,
    require: true,
    minLenght: 1,
    maxLenght: 11,
  },
  direccion: {
    type: String,
    require: true,
  },
  tipoPago: {
    type: String,
    require: true,
  },
});

module.exports = ventas;
