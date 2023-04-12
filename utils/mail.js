const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const senderEmailPassword = dotenv.config().parsed.MAIL_PASSWORD;
const sendEmail = async (receiverEmail, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "shaikhmq20.comp@coep.ac.in",
      pass: senderEmailPassword,
    },
  });

  const mailOptions = {
    from: "shaikhmq20.comp@coep.ac.in",
    to: receiverEmail,
    subject: "Product Price Update",
    html: text,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Message sent: %s", info.messageId);
    }
  });
}

module.exports = sendEmail;
