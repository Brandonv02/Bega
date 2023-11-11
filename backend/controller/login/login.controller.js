const {buscarProductos} = require("../products/products.controller");
const {find, insert, update, remove} = require("./login.uc");

exports.loginController = async (req, res) => {
  const email = req.body.correo;
  const pass = req.body.contrasena;
  const rol = req.body.rol;
  const response = await getUserController(email);
  const productos = await buscarProductos();
  if (response !== null) {
    if ( response.correo === email && response.contrasena === pass ) {
      res.render("landing", {produc: productos, sesion: rol});
    } else {
      res.render("login", {alert: "Contraseña incorrecta", error: "error", title: "Error"});
    }
  } else {
    res.render("login", {alert: "El usuario no existe", error: "error", title: "Error"});
  }
};

const getUserController = async (param) => {
  const response = await find({correo: param});
  return response;
};

exports.newUserController = async (req, res) => {
  console.log(req, "datos registro");
  try {
    await insert(req);
  } catch (error) {
    console.log(error);
    res.status(error.status);
  }
};

exports.updateUserController = async (req, res) => {
  const id = req.body.identificacion;
  const data = req.body;
  const response = await update({identificacion: id}, data);
  res.json(response);
};

exports.removeUserController = async (req, res) => {
  const id = req.body._id;
  const response = await remove({_id: id});
  res.json(response);
};
