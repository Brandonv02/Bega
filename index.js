const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./frontend/views"));
app.use(morgan("dev"));

app.use(express.json());

app.use("/api", require("./backend/routes/routes"));

// app.post("/prueba", async (req, res) => {
//   const nuevoproducto = new productos({
//     codigo: req.body.codigo,
//     stock: req.body.stock,
//     descripcion: req.body.descripcion,
//     tipo: req.body.tipo,
//     valor: req.body.valor,
//   });
//   await nuevoproducto.save();
//   res.json(nuevoproducto);
// }); 

app.listen(process.env.PORT, () => {
  console.log("estoy en el puerto: " + process.env.PORT);
});
