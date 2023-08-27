

const productos = new Schema({
  idProducto: {
    type: Number,
    require: true,
  },
  codigo: {
    type: String,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  tipoProducto: {
    type: String,
    require: true,
  },
  valor: {
    type: Number,
    require: true,
  },
});

module.exports = productos;
