const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./frontend/views"));
app.use(morgan("dev"));

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("estoy en el puerto: " + process.env.PORT);
});
