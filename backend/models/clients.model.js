const connection = require("../config/connectionbd");

const clientes = new connection.Schema({
  identificacion: {
    type: String,
    require: [true, "El documento es necesario"],
    unique: [true, "El documento ya existe"],
    minLenght: 6,
    maxLenght: 11,
  },
  nombre: {
    require: [true, "El nombre es necesario"],
    type: String,
    require: true,
  },
  correo: {
    require: [true, "El correo es necesario"],
    type: String,
    require: true,
  },
  celular: {
    type: String,
    require: true,
    maxLenght: 11,
  },
  direccion: {
    type: String,
    require: true,
  },
  contrasena: {
    require: [true, "La contraseña es necesaria"],
    type: String,
    require: true,
  },
});

const Clients = connection.model("clientes", clientes);

module.exports = Clients;
