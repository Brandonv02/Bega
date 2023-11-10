const connection = require("../config/connectionbd");

const users = new connection.Schema({
  correo: {
    require: [true, "EL correo es necesario"],
    unique: [true, "El correo ya existe"],
    type: String,
    require: true,
  },
  contrasena: {
    require: [true, "la contraseña es necesaria"],
    type: String,
    require: true,
  },
  rol: {
    type: String,
    default: "cliente",
    require: true,
  },
});

const user = connection.model("usuarios", users);

module.exports = user;
