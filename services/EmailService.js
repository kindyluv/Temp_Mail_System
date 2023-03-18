const Email = require('../models/Email');
const nodemailer = require('nodemailer');

const sendEmail = async (request) => {
    try {
        let newEmail = new Email({
            sender: request.sender,
            recipient: request.recipient,
            subject: request.subject,
            content: request.content
        })
        let emailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: request.emailAddress,
              pass: emailAddressPassword
            }
        });
        let mailOptions = {
            from: request.emailAddress,
            to: newEmail.recipient,
            subject: newEmail.subject,
            text: newEmail.content
        }
        await emailTransporter.sendMail(mailOptions);
        let response = newEmail.save();
        return {
            message: 'Email sent successfully',
            data: response
        }
    } catch (error) {
        return{
            message: `Failed to send email ${error}`,
            data: []
        }
    }
}

const findEmailRecipeintEmails = async (request) => {
    let recipient = request.recipient;
    Email.find({ recipient }, (error, emails) => {
        if (error) return res.status(500).send(error);
        return res.status(200).json(emails);
      });
}

module.exports = { sendEmail, findEmailRecipeintEmails }
