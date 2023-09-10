const connection = require("../config/connectionbd");

const clientes = new connection.Schema({
  Identificacion: {
    type: Number,
    require: [true, "El documento es necesario"],
    unique: [true, "El documento ya existe"],
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

const clients = connection.model("clientes", clientes);

module.exports = clients;
