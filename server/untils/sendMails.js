const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const sendMail = asyncHandler(async ({ email, html }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      // user: "process.evn.EMAIL_NAME",
      // pass: "process.evn.EMAIL_APP_PASSWORD",
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: '"CT466_Project" <no-reply@CT466.email>', // sender address
    to: email, // list of receivers
    subject: "Quên mật khẩu", // Subject line
    html: html, // html body
  });
  return info;
});

module.exports = sendMail;
