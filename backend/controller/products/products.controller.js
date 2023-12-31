const {log} = require("../../middleware/logs");
const {insert, find, update, remove} = require("./products.uc");

exports.buscarProductos = async (req, res) => {
  const response = await find();
  return response;
};

exports.nuevoProduct = async (req, res) => {
  const productos = await this.buscarProductos();
  const param = req.body;
  try {
    await insert(param);
    log(`se ha creado un producto, fecha: ${new Date()} \n`);
    res.render("products", {produc: productos, sesion: "admin", alert: "Creado correctamente", error: "success", title: "Exito"});
  } catch (error) {
    res.render("products", {produc: productos, sesion: "admin", alert: "El codigo ya existe", error: "error", title: "Error"});
    console.error(error);
  }
};

exports.borrarProducto = async (req, res) => {
  const productos = await this.buscarProductos();
  const id = req.body.codigo;
  try {
    const response = await remove({codigo: id});
    if (response != null) {
      log(`se ha eliminado un produto codigo ${id}, fecha: ${new Date()} \n`);
      res.render("products", {produc: productos, sesion: "admin", alert: "Eliminado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};

exports.actualizarProducto = async (req, res) => {
  const productos = await this.buscarProductos();
  const id = req.body.codigo;
  const data = req.body;
  try {
    const response = await update({codigo: id}, data);
    if (response != null) {
      log(`se ha actualizado un producto codigo ${id}, fecha: ${new Date()} \n`);
      res.render("products", {produc: productos, sesion: "admin", alert: "Actualizado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};
