const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.send(`welcome to the port ${PORT}`);
});

const mailSender = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gamil.email",
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
        name: "Username",
        address: process.env.MAIL_USER,
      }, // sender address
      to: { email }, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info);

    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.log("Error occured during sending mail", error.message);
    console.log(error);
  }
};

app.get("/send-mail", async (request, response) => {
  await mailSender();
  response.send("Mail sent successfully");
});
