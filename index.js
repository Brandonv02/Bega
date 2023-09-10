const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const routes = require("./backend/routes/routes");

require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./frontend/views"));
app.use(morgan("dev"));

app.use(express.json());

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("estoy en el puerto: " + process.env.PORT);
});
