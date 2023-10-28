const connection = require("../config/connectionbd");

const users = new connection.Schema({
  correo: {
    require: [true, "EL correo es necesario"],
    type: String,
    require: true,
  },
  constrasena: {
    require: [true, "la contraseña es necesaria"],
    type: String,
    require: true,
  },
  rol: {
    require: [true, "El rol es necesario"],
    type: String,
    default: "cliente",
    require: true,
  },
});

const user = connection.model("usuarios", users);

module.exports = user;
