const {newUserController} = require("../login/login.controller");
const {newClientUc, find, update, remove} = require("./clients.uc");
const {encriptar} = require('../../middleware/dataEncrypt');

exports.newClientController = async (req, res) => {
  const param = req.body;
  const id = req.body.identificacion;
  const buscar = await this.getClientController({identificacion: id});
  if (buscar === null) {
    try {
      await newClientUc(param);
      param.contrasena = encriptar(param.contrasena);
      await newUserController({correo: param.correo, contrasena: param.contrasena});
      res.render("login", {alert: "Se creo el cliente correctamente", error: "success", title: "Exito"});
    } catch (error) {
      res.render("register", {alert: "Error al crear cliente", error: "error", title: "Error"});
    }
  } else {
    res.render("register", {alert: "La identificacion ya existe", error: "error", title: "Error"});
  }
};

exports.newClient = async (req, res) => {
  const id = req.body.identificacion;
  const buscar = await this.getClientController({identificacion: id});
  const usu = await this.getClientController();
  const param = req.body;
  if (buscar === null) {
    try {
      await newClientUc(param);
      res.render("usuarios", {users: usu, sesion: "admin", alert: "Creado correctamente", error: "success", title: "Exito"});
    } catch (error) {
      res.render("usuarios", {users: usu, sesion: "admin", alert: "El codigo ya existe", error: "error", title: "Error"});
      console.error(error);
    }
  } else {
    res.render("usuarios", {users: usu, sesion: "admin", alert: "El codigo ya existe", error: "error", title: "Error"});
  };
};

exports.getClientController = async (param) => {
  const response = await find(param);
  return response;
};

exports.updateClientController = async (req, res) => {
  const usu = await this.getClientController();
  const id = req.body.identificacion;
  const data = req.body;
  try {
    const response = await update({identificacion: id}, data);
    if (response != null) {
      res.render("usuarios", {users: usu, sesion: "admin", alert: "Actualizado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};

exports.deleteClient = async (req, res) => {
  console.log(req.body);
  const usu = await this.getClientController();
  const id = req.body.identificacion;
  try {
    const response = await remove({identificacion: id});
    if (response != null) {
      res.render("usuarios", {users: usu, sesion: "admin", alert: "Eliminado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};
