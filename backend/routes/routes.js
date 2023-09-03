const express = require("express");
const router = express.Router();
const {newProductController, buscarProductos} = require("../controller/products/products.controller");

router.post("/prueba1", newProductController);
router.get("/productos", buscarProductos);

router.get("/pru", (req, res) => {
  res.send("hello world");
});
// async (req, res) => {
//   const params = req.body;
//   const response = await newProductController(params);
//   res.json(response);
// });


module.exports = router;
