const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  // if (recuperar === null) {
  //   console.log("No existe");
  //   res.end();
  // } else {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "bkvides@misena.edu.co",
      pass: "xvps uyrx qhdk fejw",
    },
  });
  const mailOptions = {
    from: "Remitente",
    to: "brandonvidesd@gmail.com",
    subject: "Solicitud de cotizacion",
    text: "Nueva cotizacion: ",
  };

  try {
    await transporter.sendMail(mailOptions);
    return "OK";
    console.log("Correo enviado");
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
  }
};


module.exports = {
  sendEmail,
};
