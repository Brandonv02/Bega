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
    res.render("productos", {produc: productos, sesion: "admin", alert: "Creado correctamente", error: "success", title: "Exito"});
  } catch (error) {
    res.render("productos", {produc: productos, sesion: "admin", alert: "El codigo ya existe", error: "error", title: "Error"});
    console.error(error);
  }
};

exports.borrarProducto = async (req, res) => {
  console.log(req.body);
  const productos = await this.buscarProductos();
  const id = req.body.codigo;
  try {
    const response = await remove({codigo: id});
    console.log(response);
    if (response != null) {
      res.render("productos", {produc: productos, sesion: "admin", alert: "Eliminado correctamente", error: "success", title: "Exito"});
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
    console.log(response)
    if (response != null) {
      res.render("productos", {produc: productos, sesion: "admin", alert: "Actualizado correctamente", error: "success", title: "Exito"});
    }
  } catch (error) {
    res.status(error.status);
  }
};
