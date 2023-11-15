const express = require("express");
// const fs = require("fs");
const path = require("path");
const {nuevoProduct, buscarProductos, actualizarProducto, borrarProducto} = require("../controller/products/products.controller");
const {loginController, newUserController, updateUserController, removeUserController} = require("../controller/login/login.controller");
const {newClientController, getClientController} = require("../controller/clients/clients.controller");
const {getSalesController, insertSalesController, updateSalesController, removeSalesController} = require("../controller/sales/sales.controller");
const router = express.Router();

// LOGIN
router.get("/inicioSesion", (req, res) => {
  res.render("login", {alert: "", error: "", title: ""});
});
router.get("/registro", (req, res) => {
  res.render("register", {alert: "", error: "", title: ""});
});

router.get("/products", async (req, res) => {
  const productos = await buscarProductos();
  res.render("products", {produc: productos, sesion: ""});
});
router.post("/login", loginController);
router.post("/newUser", newUserController);
router.post("/updateUser", updateUserController);
router.post("/removeUser", removeUserController);

// CLIENTS
router.post("/newClient", newClientController);
router.post("/getClient", getClientController);
// router.post("/newClient", newClientController);
// router.post("/newClient", newClientController);

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

// router.get("/index", (req, res) => {

//   res.render("landing");
// });

router.get("/prueba", (req, res) => {
  const fs = require("fs");
  const text = "prueba de file system hoy si sirve";
  const rutaPersonalizada = path.join(__dirname, "../files/logs", "fileLogs.txt");
  fs.writeFile(rutaPersonalizada, text, (err) => {
    if (err) throw err;
  });
});

module.exports = router;
