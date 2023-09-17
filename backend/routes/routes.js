const express = require("express");
const {nuevoProduct, buscarProductos} = require("../controller/products/products.controller");
const {loginController} = require("../controller/login/login.controller");
const {newClientController} = require("../controller/clients/clients.controller");
const router = express.Router();

// LOGIN
router.get("/login", loginController);


// CLIENTS
router.post("/newClient", newClientController);


// SALES


// PRODUCTS
router.post("/newproduct", nuevoProduct);
router.get("/products", buscarProductos);

router.get("/pru", (req, res) => {
  res.send("hello world");
});

module.exports = router;
