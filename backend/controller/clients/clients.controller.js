const {newUserController} = require("../login/login.controller");
const {newClientUc, find} = require("./clients.uc");

exports.newClientController = async (req, res) => {
  const param = req.body;
  const buscar = await this.getClientController(req.body);
  if (buscar === null) {
    try {
      await newClientUc(param);
      await newUserController({correo: param.correo, contrasena: param.contrasena});
      res.render("login", {alert: "Se creo el cliente correctamente", error: "success", title: "Exito"});
    } catch (error) {
      res.render("register", {alert: "Error al crear cliente", error: "error", title: "Error"});
    }
  } else {
    res.render("register", {alert: "La identificacion ya existe", error: "error", title: "Error"});
  }
};

exports.getClientController = async (req, res) => {
  const id = req.identificacion;
  const response = await find({identificacion: id});
  return response;
};

