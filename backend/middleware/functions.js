const nodemailer = require("nodemailer");

const sendEmail = async (params) => {
  // if (recuperar === null) {
  //   console.log("No existe");
  //   res.end();
  // } else {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "begaproductos@gmail.com",
      pass: "gape dqlm sqhs xwfo",
    },
  });
  const mailOptions = {
    from: "Remitente",
    to: "brandonvidesd@gmail.com",
    subject: "Solicitud de cotizacion",
    html: `<p style="color: green; font-size: 40px; font-weight: bold;">Nueva cotización:</p>
    <p>El señor(a) ${params.nombre} de la empresa ${params.compania} está solicitando una cotización.</p>
    <p>Comuníquese al correo: ${params.correo}</p>
    <img src="cid:logo" style="width: 200px;" alt="Logo">`,
    attachments: [
      {
        filename: "BEGA.png",
        path: "./frontend/static/assets/images/BEGA.png",
        cid: "logo", // Este CID es utilizado en el src del tag img en el HTML
      },
    ],
  };
  const mailOptions2 = {
    from: "Remitente",
    to: params.correo,
    subject: "Solicitud de cotizacion",
    html: `<p style="color: green; font-size: 40px; font-weight: bold;">Nueva cotización:</p>
    <p>Señor(a) ${params.nombre} de la empresa ${params.compania} su solicitud fue enviada correctamente.</p>
    <img src="cid:logo" style="width: 200px;" alt="Logo">`,
    attachments: [
      {
        filename: "BEGA.png",
        path: "./frontend/static/assets/images/BEGA.png",
        cid: "logo", // Este CID es utilizado en el src del tag img en el HTML
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);
    return "OK";
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
  }
};


module.exports = {
  sendEmail,
};
