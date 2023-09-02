
const clientes = new Schema({
  idIdentificacion: {
    type: Number,
    require: true,
    minLenght: 6,
    maxLenght: 11,
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
  contrasena: {
    type: String,
    require: true,
  },
});

module.exports = clientes;
