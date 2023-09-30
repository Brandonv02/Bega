const {find, insert, update, remove} = require("./login.uc");

exports.loginController = async (req, res) => {
  const id = req.body.identificacion;
  const response = await getUserController(id);
  console.log(response);
  res.json(response);
};

const getUserController = async (param) => {
  const response = await find({identificacion: param});
  return response;
};

exports.newUserController = async (req, res) => {
  const data = req.body;
  try {
    const response = await insert(data);
    res.json(response);
  } catch (error) {
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
