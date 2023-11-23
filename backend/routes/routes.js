const express = require("express");

// const fs = require("fs");
const path = require("path");
const {nuevoProduct, buscarProductos, actualizarProducto, borrarProducto} = require("../controller/products/products.controller");
const {loginController, newUserController, updateUserController, removeUserController, getUserController} = require("../controller/login/login.controller");
const {newClientController, getClientController, updateClientController, deleteClient, newClient} = require("../controller/clients/clients.controller");
const {getSalesController, insertSalesController, updateSalesController, removeSalesController} = require("../controller/sales/sales.controller");
const auth = require('../middleware/auth');
const { desencriptar } = require("../middleware/dataEncrypt");
const router = express.Router();

// LOGIN
router.get("/inicioSesion", (req, res) => {
  res.render("login", {alert: "", error: "", title: ""});
});

router.get("/registro", (req, res) => {
  res.render("register", {alert: "", error: "", title: ""});
});

router.get("/landing", async (req, res) => {
  let rol = req.cookies.rol;
  const productos = await buscarProductos();
  res.render("landing", {produc: productos, sesion: rol, alert: "", error: "", title: ""});
});

router.get("/usuariosVista",auth.verifyAdmin, async (req, res) => {
  let rol = req.cookies.rol;
  const usu = await getClientController();
  res.render("usuarios", {users: usu, sesion: rol, alert: "", error: "", title: ""});
});

router.get("/users",auth.verifyAdmin, async (req, res) => {
  let rol = req.cookies.rol;
  const usuarios = await getUserController();
  const users = usuarios.map(res => ({
    correo: res.correo,
    contrasena: desencriptar(res.contrasena),
    rol: res.rol
  }));
  res.render("users", {users: users, sesion: rol, alert: "", error: "", title: ""});
});

router.get("/products",auth.verifyAdmin, async (req, res) => {
  let rol = req.cookies.rol;
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
router.post("/deleteClient", deleteClient);
router.post("/newClientadmin", newClient)

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


router.get("/prueba", (req, res) => {
  const fs = require("fs");
  const text = "prueba de file system hoy si sirve";
  const rutaPersonalizada = path.join(__dirname, "../files/logs", "fileLogs.txt");
  fs.writeFile(rutaPersonalizada, text, (err) => {
    if (err) throw err;
  });
});

module.exports = router;
