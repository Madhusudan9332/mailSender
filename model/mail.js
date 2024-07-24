const { text } = require("express");
const mongoose = require("mongoose");
const MailMessage = require("nodemailer/lib/mailer/mail-message");

const mailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  text: {
    type: String,
    default : ""
  },
  html: {
    type: String,
    default : ""
  },
});

const mailModel = mongoose.model("mails", mailSchema);

module.exports = mailModel;
