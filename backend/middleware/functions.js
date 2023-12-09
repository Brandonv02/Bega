const nodemailer = require("nodemailer");

const sendEmail = async (params) => {
  // if (recuperar === null) {
  //   console.log("No existe");
  //   res.end();
  // } else {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "bkvides@misena.edu.co",
      pass: "nieu mofc lkdj igwm",
    },
  });
  const mailOptions = {
    from: "Remitente",
    to: "brandonvidesd@gmail.com",
    subject: "Solicitud de cotizacion",
    text: `Nueva cotizacion: El señor(a) ${params.nombre} de la empresa ${params.compania}, esta solicitando una 
    cotizacon comunicarse al correo: ${params.correo} `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return "OK";
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
  }
};


module.exports = {
  sendEmail,
};
