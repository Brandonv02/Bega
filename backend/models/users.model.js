

const users = new Schema({
  correo: {
    type: String,
    require: true,
  },
  constrasena: {
    type: String,
    require: true,
  },
});

module.exports = users;
