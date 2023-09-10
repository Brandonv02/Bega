const {loginUc} = require("./login.uc");

exports.loginController = async (req, res) => {
//   const params = req.body;
  const response = await loginUc();
  res.json(response);
};
