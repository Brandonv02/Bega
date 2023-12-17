const {newClientUc, find, update, remove, insertUser, updateU} = require("./clients.uc");
const {encriptar} = require("../../middleware/dataEncrypt");
const {log} = require("../../middleware/logs");
const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24, // Duración de la cookie en milisegundos (aquí, 1 día)
  httpOnly: true,
  // Otras opciones de configuración de cookie si es necesario
};

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
      log(`se ha creado un cliente, fecha: ${new Date()} \n`);
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
      log(`se ha creado un cliente, fecha: ${new Date()} \n`);
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
  const datauser = {
    correo: req.body.correo,
    contrasena: encriptar(req.body.contrasena),
  };
  const id = req.body.identificacion;
  const data = req.body;
  try {
    await updateU({correo: datauser.correo}, datauser);
    const response = await update({identificacion: id}, data);
    if (response != null) {
      log(`se ha realizado una actualizacion de datos, fecha: ${new Date()} \n`);
      res.render("usuarios", {users: usu, sesion: "admin", alert: "Actualizado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};

exports.updateProfile = async (req, res) => {
  const dataClient = req.cookies.data;
  const datauser = {
    correo: req.body.correo,
    contrasena: encriptar(req.body.contrasena),
  };
  const data = req.body;
  try {
    const response = await update({_id: dataClient._id}, data);
    await updateU({correo: response.correo}, datauser);
    if (response != null) {
      const rol = req.cookies.rol;
      res.cookie("data", response, cookieOptions);
      log(`se ha realizado una actualizacion de datos perfil, fecha: ${new Date()} \n`);
      res.render("profile", {sesion: rol, profile: dataClient, sesion: rol, alert: "Actualizado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.render("profile", {sesion: rol, profile: dataClient, sesion: rol, alert: "Ocurrio un error", error: "error", title: "Error"});
  }
};

exports.deleteClient = async (req, res) => {
  const usu = await this.getClientController();
  const id = req.body.identificacion;
  try {
    const response = await remove({identificacion: id});
    if (response != null) {
      log(`se ha eliminado un cliente, fecha: ${new Date()} \n`);
      res.render("usuarios", {users: usu, sesion: "admin", alert: "Eliminado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};
