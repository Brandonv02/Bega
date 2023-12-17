const path = require("path");

exports.log = (texto) => {
  const fs = require("fs");
  // const text = "prueba de file system hoy si sirve";
  const rutaPersonalizada = path.join(__dirname, "../files/logs", "fileLogs.txt");
  fs.appendFile(rutaPersonalizada, texto, (err) => {
    if (err) throw err;
  });
};
