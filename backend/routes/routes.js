const express = require("express");
const {nuevoProduct, buscarProductos} = require("../controller/products/products.controller");
const {loginController, newUserController, updateUserController, removeUserController} = require("../controller/login/login.controller");
const {newClientController} = require("../controller/clients/clients.controller");
const router = express.Router();

// LOGIN
router.post("/login", loginController);
router.post("/newUser", newUserController);
router.post("/updateUser", updateUserController);
router.post("/removeUser", removeUserController);

// CLIENTS
router.post("/newClient", newClientController);


// SALES
router.get("/getSales", );

// PRODUCTS
router.post("/newproduct", nuevoProduct);
router.get("/products", buscarProductos);

router.get("/pru", (req, res) => {
  res.send("hello world");
});

module.exports = router;
