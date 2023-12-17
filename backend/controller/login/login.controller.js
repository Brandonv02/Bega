const {buscarProductos} = require("../products/products.controller");
const {find, insert, update, remove} = require("./login.uc");
const {desencriptar} = require("../../middleware/dataEncrypt");
const {getClientController} = require("../clients/clients.controller");
const {log} = require("../../middleware/logs");

const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24, // Duración de la cookie en milisegundos (aquí, 1 día)
  httpOnly: true,
  // Otras opciones de configuración de cookie si es necesario
};

exports.loginController = async (req, res) => {
  const email = req.body.correo;
  const pass = req.body.contrasena;
  const response = await this.getUserController({correo: email});
  const buscarCliente = await getClientController({correo: email});
  const productos = await buscarProductos();
  if (response !== null) {
    response.contrasena = desencriptar(response.contrasena);
    console.log(response);
    if ( response.correo === email && response.contrasena === pass ) {
      const rol = response.rol;
      res.cookie("rol", rol, cookieOptions);
      res.cookie("data", buscarCliente, cookieOptions);
      log(`${response.correo} ingreso a la app, fecha: ${new Date()} \n`);
      res.render("landing", {produc: productos, sesion: rol, alert: "", error: "", title: ""});
    } else {
      res.render("login", {alert: "Contraseña incorrecta", error: "error", title: "Error"});
    }
  } else {
    res.render("login", {alert: "El usuario no existe", error: "error", title: "Error"});
  }
};

exports.getUserController = async (param) => {
  const response = await find(param);
  return response;
};

exports.newUserController = async (param) => {
  console.log(param);
  try {
    await insert(req);
  } catch (error) {
    console.log(error);
    res.status(error.status);
  }
};

exports.updateUserController = async (req, res) => {
  const data = {rol: req.body.rol};
  const id = req.body.correo;
  const usu = await this.getUserController();
  try {
    const response = await update({correo: id}, data);
    if (response != null) {
      log(`realizaron una actualizacion de datos, fecha: ${new Date()} \n`);
      res.render("users", {users: usu, sesion: "admin", alert: "Actualizado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.removeUserController = async (req, res) => {
  try {
    const usu = await this.getUserController();
    const id = req.body.correo;
    const response = await remove({correo: id});
    if (response != null) {
      log(`se ha eliminado un usuario, fecha: ${new Date()} \n`);
      res.render("users", {users: usu, sesion: "admin", alert: "Eliminado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};
