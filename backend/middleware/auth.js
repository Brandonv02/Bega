const {buscarProductos} = require("../controller/products/products.controller");

exports.verifyAdmin = async (req,res,next) => {
    const rol = req.cookies.rol;
    const productos = await buscarProductos();
    if (rol !== 'admin'){
        res.render("landing", {produc: productos, sesion: rol, alert: "No estas autorizado", error: "error", title: "Error"});
    } else {
        next();
    }

}