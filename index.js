const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const path = require("path");
const routes = require("./backend/routes/routes");
const swaggerDoc = require("./swagger.json");

// swagger
const swaggerUI = require("swagger-ui-express");
const {buscarProductos} = require("./backend/controller/products/products.controller");
const {sendEmail} = require("./backend/middleware/functions");

require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./frontend/views"));
app.use(express.static(__dirname + "/frontend/static/assets"));
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/", async (req, res) => {
  res.clearCookie("rol");
  const productos = await buscarProductos();
  res.render("landing", {
    produc: productos,
    sesion: "",
    alert: "", error: "", title: "",
  });
});

app.get("/landing", async (req, res) => {
  const productos = await buscarProductos();
  res.render("landing", {produc: productos, sesion: "",
    alert: "", error: "", title: ""});
});

app.get("/cotizacion", (req, res) => {
  res.render("cotizacion", {sesion: "",
    alert: "", error: "", title: ""});
});

app.post("/solicitudCotiza", async (req, res) => {
  const response = await sendEmail();
  if (response === "OK") {
    res.render("cotizacion", {sesion: "",
      alert: "Correo enviado correctamente", error: "success", title: "Exito"});
  } else {
    res.render("cotizacion", {sesion: "",
      alert: "Error al enviar correo", error: "Error", title: "Error"});
  }
});

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("este es el puerto: " + process.env.PORT);
});
