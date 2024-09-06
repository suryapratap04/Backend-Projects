const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gamil.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name: "Surya Pratap Singh",
        address: process.env.MAIL_USER,
      }, // sender address
      to: "sp2386115@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.log(error);
  }
};

module.exports = { mailSender };
