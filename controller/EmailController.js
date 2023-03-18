const { response } = require("express");
const { findEmailRecipeintEmails, sendEmail } = require("../services/EmailService");

const sendMail = (req, res, next)=>{
    sendEmail(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>
        {res.json(error)
    })
}

const getEmailByRecipientEmail = (req, res, next)=>{
    findEmailRecipeintEmails(req.params)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

module.exports = { sendMail, getEmailByRecipientEmail };