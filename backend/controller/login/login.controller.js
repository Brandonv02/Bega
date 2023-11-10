const {find, insert, update, remove} = require("./login.uc");

exports.loginController = async (req, res) => {
  console.log(req.body, "datos login")
  return
  const email = req.body.correo;
  const response = await getUserController(email);
  console.log(response);
  res.json(response);
  if (response !== null) {
    res.json("ya existe");  
  }
};

const getUserController = async (param) => {
  const response = await find({correo: param});
  return response;
};

exports.newUserController = async (req, res) => {
  console.log(req, "datos registro");
  try {
    const response = await insert(req);
  } catch (error) {
    console.log(error);
    res.status(error.status);
  }
};

exports.updateUserController = async (req, res) => {
  const id = req.body.identificacion;
  const data = req.body;
  const response = await update({identificacion: id}, data);
  res.json(response);
};

exports.removeUserController = async (req, res) => {
  const id = req.body._id;
  const response = await remove({_id: id});
  res.json(response);
};
