const nodemailer = require("nodemailer");
require("dotenv").config()
const sendMail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });
    console.log("sucessfuly sent mail to your registered email address");
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendMail;
