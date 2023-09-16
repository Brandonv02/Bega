const express = require("express");
const {nuevoProductController, buscarProductoscontroller} = require("../controller/products/products.controller");
const {loginController} = require("../controller/login/login.controller");
const {newClientController} = require("../controller/clients/clients.controller");
const router = express.Router();

// LOGIN
router.get("/login", loginController);


// CLIENTS
router.post("/newClient", newClientController);


// SALES


// PRODUCTS
router.post("/newproduct", nuevoProductController);
router.get("/productos", buscarProductoscontroller);

router.get("/pru", (req, res) => {
  res.send("hello world");
});

module.exports = router;
