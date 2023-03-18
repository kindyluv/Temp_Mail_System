const MessageService = require('../services/MessageService')

const sendMessage = (req, res, next)=>{
    MessageService.sendMessage(req.body)
    .then((response)=>{
        res.json({
            response
        })
    })
    .catch((error)=>{
        res.json({
            message: error
        })
    })
}

const getAllReceiverMessagesByReceiverId = (req, res, next)=>{
    MessageService.findAllReceiverMessageByReceiverId(req.params.receiver)
        .then((response)=>{
        res.json({
            response
        })
    })
    .catch((error)=>{
        res.json({
            message: error
        })
    })
}

const getMessagesBetweenTwoUsers = (req, res, next)=>{
    const { sender, receiver } = req.params;
    MessageService.findAllMessageByReceiverIdAndSenderId(sender, receiver)
    .then((response)=>{
        res.json({
            response
        })
    })
    .catch((error)=>{
        res.json({
            message: error
        })
    })
}

module.exports = { sendMessage, getAllReceiverMessagesByReceiverId, getMessagesBetweenTwoUsers };