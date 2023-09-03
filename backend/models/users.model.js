const connection = require("../config/connectionbd");

const users = new connection.Schema({
  correo: {
    type: String,
    require: true,
  },
  constrasena: {
    type: String,
    require: true,
  },
  rol: {
    type: String,
    default: "cliente",
    require: true,
  },
});

const user = conexionBD.model("usuarios", users);

module.exports = user;
