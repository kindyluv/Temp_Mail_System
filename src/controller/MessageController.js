const MessageService = require('../services/MessageService')

const sendMessage = (req, res)=>{
    MessageService.sendMessage(req.body.sender, req.body.receiver,req.body. messageTitle, req.body.messageBody)
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

const sendMessageByEmailAddress = (req, res) =>{
    MessageService.sendMessagesBySenderAndReceiverEmails(req.body)
    .then((response) =>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    });
}

const sendMessageBySenderAndReceiverPhoneNumber = (req, res)=>{
    MessageService.sendMessageBySenderAndReceiverPhoneNumber(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    });
}

const getAllReceiverMessagesByReceiverId = (req, res)=>{
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

const getMessagesBetweenTwoUsers = (req, res)=>{
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

const getAllOutBoxBySenderId = (req, res) =>{
    MessageService.findAllSentMessagesBySenderId(req.params)
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

const getAllReceiverMessagesByReceiverPhoneNumber = (req, res)=>{
    MessageService.findAllReceiverMessageByReceiverPhoneNumber(req.params.phoneNumber)
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

const getAllReceiverMessagesBySenderPhoneNumber = (req, res)=>{
    MessageService.findAllReceiverMessageBySenderPhoneNumber(req.params.phoneNumber)
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

const getAllReceiverMessagesBySenderAndReceiverPhoneNumber = (req, res)=>{
    MessageService.findAllReceiverMessageBySenderPhoneNumber(req.params.senderPhone, req.params.receiverPhone)
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


module.exports = { sendMessage, sendMessageByEmailAddress, sendMessageBySenderAndReceiverPhoneNumber, getAllReceiverMessagesByReceiverId, getMessagesBetweenTwoUsers, getAllOutBoxBySenderId, getAllReceiverMessagesByReceiverPhoneNumber, getAllReceiverMessagesBySenderPhoneNumber, getAllReceiverMessagesBySenderAndReceiverPhoneNumber };