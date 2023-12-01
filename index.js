const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const routes = require("./backend/routes/routes");
const swaggerDoc = require("./swagger.json");
// const funciones = require("./functions");

// swagger
const swaggerUI = require("swagger-ui-express");
const { buscarProductos } = require("./backend/controller/products/products.controller");

require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./frontend/views"));
app.use(express.static(__dirname + "/frontend/static/assets"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/", async (req, res) => {
  const productos = await buscarProductos();
  console.log(productos, "llefo")
  res.render("catalogo", {
    produc : productos
  });
});

app.get("/", async (req, res) => {
  res.clearCookie("rol");
  const productos = await buscarProductos();
  res.render("landing", {
    produc: productos,
    sesion: "",
    alert: "", error: "", title: "",
  });
});

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("Puerto en uso: " + process.env.PORT);
});
