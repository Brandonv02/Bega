const {find, insert, update, remove} = require("./sales.uc");

exports.getSalesController = async (req, res) => {
  const response = await find();
  res.json(response);
};

exports.insertSalesController = async (req, res) => {
  const data = req.body;
  try {
    const response = await insert(data);
    res.json(response);
  } catch (error) {
    res.status(error.status);
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
