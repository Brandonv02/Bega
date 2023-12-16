const {find, insert, update, remove} = require("./sales.uc");

exports.getSalesController = async (req, res) => {
  const response = await find();
  return response;
};

exports.insertSalesController = async (req, res) => {
  const data = req;
  try {
    await insert(data);
    return true;
  } catch (error) {
    console.log(error);
  }
};

exports.updateSalesController = async (req, res) => {
  const id = req.body.identificacion;
  const data = req.body;
  const response = await update({identificacion: id}, data);
  res.json(response);
};

exports.removeSalesController = async (req, res) => {
  const id = req.body.factura;
  try {
    const response = await remove({factura: id});
    res.json(response);
  } catch (error) {
    res.status(error.status);
  }
};
