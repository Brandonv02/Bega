const express = require("express");

// const fs = require("fs");
const {nuevoProduct, buscarProductos, actualizarProducto, borrarProducto} = require("../controller/products/products.controller");
const {loginController, newUserController, updateUserController, removeUserController, getUserController} = require("../controller/login/login.controller");
const {newClientController, getClientController, updateClientController, deleteClient, newClient, updateProfile} = require("../controller/clients/clients.controller");
const {getSalesController, insertSalesController, updateSalesController, removeSalesController} = require("../controller/sales/sales.controller");
const auth = require("../middleware/auth");
const {desencriptar} = require("../middleware/dataEncrypt");
const {sendEmail} = require("../middleware/functions");
const {findSales} = require("../controller/sales/sales.uc");
const {log} = require("../middleware/logs");
const router = express.Router();

// LOGIN
router.get("/inicioSesion", (req, res) => {
  res.render("login", {alert: "", error: "", title: ""});
});

router.get("/redirect", (req, res) => {
  res.render("login", {alert: "Inicia sesion para realizar la compra", error: "warning", title: "Advertencia"});
});

router.get("/success", async (req, res) => {
  const fecha = new Date();
  const offset = fecha.getTimezoneOffset() * 60000;
  const fechaLocal = new Date(fecha.getTime() - offset);
  const fechaISOLocal = fechaLocal.toISOString().split(".")[0].replace("T", " ");
  const dataSale = req.cookies.data;
  const min = 1;
  const max = 9999;
  const aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  const data = {
    identificacion: dataSale.identificacion,
    nombre: dataSale.nombre,
    fecha: fechaISOLocal,
    factura: aleatorio,
    tipoPago: "MercadoPago",
    productos: "",
    estado: "Aprobado",
  };
  await insertSalesController(data);
  log(`se ha registrado una nueva venta, fecha: ${new Date()} \n`);
  res.render("tranSuccess");
});

router.get("/fail", async (req, res) => {
  const fecha = new Date();
  const offset = fecha.getTimezoneOffset() * 60000;
  const fechaLocal = new Date(fecha.getTime() - offset);
  const fechaISOLocal = fechaLocal.toISOString().split(".")[0].replace("T", " ");
  const dataSale = req.cookies.data;
  const min = 1;
  const max = 9999;
  const aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  const data = {
    identificacion: dataSale.identificacion,
    nombre: dataSale.nombre,
    fecha: fechaISOLocal,
    factura: aleatorio,
    tipoPago: "MercadoPago",
    productos: "",
    estado: "Rechazado",
  };
  await insertSalesController(data);
  log(`se ha registrado una nueva venta, fecha: ${new Date()} \n`);
  res.render("tranFailed");
});

router.get("/profile", async (req, res) => {
  const rol = req.cookies.rol;
  const dataClient = req.cookies.data;
  res.render("profile", {sesion: rol, profile: dataClient, alert: "", error: "", title: ""});
});

router.get("/registro", (req, res) => {
  res.render("register", {alert: "", error: "", title: ""});
});

router.get("/landing", async (req, res) => {
  const rol = req.cookies.rol;
  const productos = await buscarProductos();
  console.log(productos);
  res.render("landing", {produc: productos, sesion: rol, alert: "", error: "", title: ""});
});

router.get("/usuariosVista", auth.verifyAdmin, async (req, res) => {
  const rol = req.cookies.rol;
  const usu = await getClientController();
  res.render("usuarios", {users: usu, sesion: rol, alert: "", error: "", title: ""});
});

router.get("/cotizacion", (req, res) => {
  const rol = req.cookies.rol;
  res.render("cotizacion", {sesion: rol,
    alert: "", error: "", title: ""});
});

router.get("/sales", async (req, res) => {
  const rol = req.cookies.rol;
  const data = req.cookies.data.identificacion;
  const ventas = await findSales();
  let sales;
  if (rol !== "admin") {
    sales = ventas.filter((dat) => dat.identificacion === data);
  } else {
    sales = ventas;
  }
  res.render("sales", {dataSale: sales, sesion: rol});
});

router.get("/users", auth.verifyAdmin, async (req, res) => {
  const rol = req.cookies.rol;
  const usuarios = await getUserController();
  const users = usuarios.map((res) => ({
    correo: res.correo,
    contrasena: res.contrasena,
    rol: res.rol,
  }));
  res.render("users", {users: users, sesion: rol, alert: "", error: "", title: ""});
});

router.post("/solicitudCotiza", async (req, res) => {
  const rol = req.cookies.rol;
  const response = await sendEmail(req.body);
  if (response === "OK") {
    res.render("cotizacion", {sesion: rol, alert: "Correo enviado correctamente, nos contactaremos en breve contigo!!", error: "success", title: "Exito"});
  } else {
    res.render("cotizacion", {sesion: rol,
      alert: "Error al enviar correo", error: "error", title: "Error"});
  }
});

router.get("/products", auth.verifyAdmin, async (req, res) => {
  const rol = req.cookies.rol;
  const productos = await buscarProductos();
  res.render("products", {produc: productos, sesion: rol, alert: "", error: "", title: ""});
});

router.post("/login", loginController);
router.post("/newUser", newUserController);
router.post("/updateUser", updateUserController);
router.post("/removeUser", removeUserController);

// CLIENTS
router.post("/newClient", newClientController);
router.post("/getClient", getClientController);
router.post("/updateClient", updateClientController);
router.post("/updatePro", updateProfile);
router.post("/deleteClient", deleteClient);
router.post("/newClientadmin", newClient);

// SALES
router.post("/getSales", getSalesController);
router.post("/insertSales", insertSalesController);
router.post("/updateSales", updateSalesController);
router.post("/deleteSales", removeSalesController);

// PRODUCTS
router.post("/newproduct", nuevoProduct);
router.post("/getProducts", buscarProductos);
router.post("/updateProducts", actualizarProducto);
router.post("/deleteProducts", borrarProducto);

module.exports = router;
