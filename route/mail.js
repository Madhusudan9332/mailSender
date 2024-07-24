const express = require("express");
const mailController = require("../controller/mail");

const router = express.Router();

router.get('/',(_,res)=>{
    res.render('home')
});
router.post("/api/mails/send", mailController.sendEmail);

module.exports = router;