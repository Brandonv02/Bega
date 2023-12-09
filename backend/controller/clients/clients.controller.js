const {newClientUc, find, update, remove, insertUser} = require("./clients.uc");
const {encriptar} = require("../../middleware/dataEncrypt");

exports.newClientController = async (req, res) => {
  const param = req.body;
  const id = req.body.identificacion;
  const email = req.body.correo;
  const buscarUser = await this.getClientController({identificacion: id});
  const buscarEmail = await this.getClientController({correo: email});
  if (buscarUser === null && buscarEmail === null) {
    try {
      await newClientUc(param);
      param.contrasena = encriptar(param.contrasena);
      await insertUser({correo: param.correo, contrasena: param.contrasena});
      res.render("login", {alert: "Se creo el cliente correctamente", error: "success", title: "Exito"});
    } catch (error) {
      console.log(error);
      res.render("register", {alert: "Error al crear cliente", error: "error", title: "Error"});
    }
  } else {
    res.render("register", {alert: "La identificacion o correo ya existe", error: "error", title: "Error"});
  }
};

exports.newClientapi = async (req, res) => {
  try {
    const response = await newClientUc(req);
    res.json(response);
  } catch (error) {
    console.log(error);
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
      param.contrasena = encriptar(param.contrasena);
      await insertUser({correo: param.correo, contrasena: param.contrasena});
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
