const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const routes = require("./backend/routes/routes");
const swaggerDoc = require("./swagger.json");

// swagger
const swaggerUI = require("swagger-ui-express");

require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./frontend/views"));
app.use(morgan("dev"));
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("este es el puerto: " + process.env.PORT);
});
