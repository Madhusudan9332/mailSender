const nodemailer = require("nodemailer");
const dotenv = require("dotenv");


const mailModel = require("../model/mail");
dotenv.config();

const sendEmail = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailData = {
    to: req.body.email,
    from: "do-not-reply@filesharing.com", 
    subject: req.body?.subject || "Test Email",
    text: req.body?.text || "Hello World!",
    html: req.body?.html || "<p>Hello World!</p>",
    // to: "madhusudangautam003@gmail.com",
    // from: "do-not-reply@filesharing.com",
    // subject: "Test Email",
    // text : "Test Email",
    // html: "<b>Test Email</b>",
  };

  transporter.sendMail(emailData, async (error, info) => {
    if (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Unable to send email",
        error: error,
      });
    }
    console.log(info);
    await mailModel.create(emailData);
    res.json({
      success: true,
      message: "Mail sent successfully",
      mail : info,
    });
  });
};

const mailController = {
  sendEmail,
};

module.exports = mailController;
