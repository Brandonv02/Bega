const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const path = require("path");
const routes = require("./backend/routes/routes");
const swaggerDoc = require("./swagger.json");
const cors = require("cors");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "TEST-1167254088299383-120100-057de93b88b9e4f34700b6f05733ebfc-1570998320",
});
// swagger
const swaggerUI = require("swagger-ui-express");
const {buscarProductos} = require("./backend/controller/products/products.controller");
const {sendEmail} = require("./backend/middleware/functions");

require("dotenv").config();
app.set("view engine", "ejs");
app.use(cors());
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

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      "success": "http://localhost:3002/success",
      "failure": "http://localhost:3002/",
      "pending": "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences.create(preference)
      .then(function(response) {
        res.json({
          id: response.body.id,
        });
      }).catch(function(error) {
        console.log(error);
      });
});

app.get("/landing", async (req, res) => {
  const productos = await buscarProductos();
  res.render("landing", {produc: productos, sesion: "",
    alert: "", error: "", title: ""});
});

app.get("/success", (req, res) => {
  res.render("tranSuccess");
});

app.get("/cotizacion", (req, res) => {
  res.render("cotizacion", {sesion: "",
    alert: "", error: "", title: ""});
});

app.post("/solicitudCotiza", async (req, res) => {
  const response = await sendEmail(req.body);
  if (response === "OK") {
    res.render("cotizacion", {sesion: "",
      alert: "Correo enviado correctamente", error: "success", title: "Exito"});
  } else {
    res.render("cotizacion", {sesion: "",
      alert: "Error al enviar correo", error: "error", title: "Error"});
  }
});

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("este es el puerto: " + process.env.PORT);
});
