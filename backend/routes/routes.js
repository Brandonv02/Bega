const express = require("express");
const {newProductController, buscarProductoscontroller} = require("../controller/products/products.controller");
const {loginController} = require("../controller/login/login.controller");
const router = express.Router();

router.get("/login", loginController);
router.post("/prueba1", newProductController);
router.get("/productos", buscarProductoscontroller);

router.get("/pru", (req, res) => {
  res.send("hello world");
});

module.exports = router;
