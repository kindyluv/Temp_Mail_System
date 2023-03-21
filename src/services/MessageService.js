const Message = require("../models/message");
const Notification = require("../models/Notification");
const { findUserByEmail, findUserByPhoneNumber } = require("./AppUserService");

const sendMessage = async (request) => {
    try{
        const { sender, receiver, messageTitle, messageBody } = request;
        let newMessage = new Message({ sender, receiver, messageTitle, messageBody });

        // let newMessage = new Message({
        //     sender: request.sender,
        //     receiver: request.receiver,
        //     messageTitle: request.messageTitle,
        //     messageBody: request.messageBody
        // })

        let savedMessage = await newMessage.save();

        let notification = await Notification({
            appUser: receiver,
            message: savedMessage._id
        })

        await notification.save();

        return {
            message: 'Message Successfully Sent',
            data: savedMessage
        }
    }catch(error){
        return{
            message: `Server Error ${error}`,
            data: []
        }
    }
}

const sendMessagesBySenderAndReceiverEmails = async (request) => {
    const { senderEmail, receiverEmail, messageTitle, messageBody } = request;

    let senderDetails = await findUserByEmail(senderEmail);

    let receiverDetails = await findUserByEmail(receiverEmail);

    let req = {
        sender: senderDetails._id,
        receiver: receiverDetails._id,
        messageTitle: messageTitle,
        messageBody: messageBody
    }

    return sendMessage(req)
}

const sendMessageBySenderAndReceiverPhoneNumber = async (request) => {
    const { senderPhoneNumber, receiverPhoneNumber, messageTitle, messageBody } = request;

    let senderDetails = await findUserByPhoneNumber(senderPhoneNumber);

    let receiverDetails = await findUserByPhoneNumber(receiverPhoneNumber);

    let req = {
        sender: senderDetails._id,
        receiver: receiverDetails._id,
        messageTitle: messageTitle,
        messageBody: messageBody
    }

    return sendMessage(req)

}

const findAllReceiverMessageByReceiverId = async (receiver) => {
    try {
        let responseFound = [];
        let foundMessages =  Message.find({ receiver: receiver });
        (await foundMessages).forEach((value)=>{
            responseFound.push(value)
        })
        if (responseFound.length === 0) {
            return {
                message: 'No release found',
                data: []
                }
        }
        return {
            message: `${responseFound.length} Messages Successfully Retrived`,
            data: responseFound
        }
    } catch (error) {
        return{
            message: `Server Error ${error}`,
            data: []
        }
    }
}

const findAllMessageByReceiverIdAndSenderId = async (sender, receiver) => {
    try {
        let responseFound = [];

       let foundMessages =  Message.find({ $or: [{ sender, receiver }, { sender: receiver, receiver: sender }] });

        (await foundMessages).forEach((value)=>{
            responseFound.push(value)
        })
        if (responseFound.length === 0) {
            return {
                message: 'No release found',
                data: []
                }
        }
        return {
            message: `${responseFound.length} releases found`,
            data: responseFound
        }

        
    } catch (error) {
        return{
            message: `Server Error ${error}`,
            data: []
        }
    }
}

const findAllSentMessagesBySenderId = async (request) =>{
    try {
        const { senderId } = request;
        let responseFound = [];
        let foundMessages =  Message.find({ sender: senderId });
        (await foundMessages).forEach((value)=>{
            responseFound.push(value)
        })
        if (responseFound.length === 0) {
            return {
                message: 'No release found',
                data: []
                }
        }
        return {
            message: `${responseFound.length} Messages Successfully Retrived`,
            data: responseFound
        }
    } catch (error) {
        return{
            message: `Server Error ${error}`,
            data: []
        }
    }
}

const findAllReceiverMessageByReceiverPhoneNumber = async (phoneNumber) => {
    try {
        let responseFound = [];
        let receiverDetails = await findUserByPhoneNumber(phoneNumber);

        let foundMessages =  Message.find({ receiver: receiverDetails._id });
        (await foundMessages).forEach((value)=>{
            responseFound.push(value)
        })
        if (responseFound.length === 0) {
            return {
                message: 'No release found',
                data: []
                }
        }
        return {
            message: `${responseFound.length} Messages Successfully Retrived`,
            data: responseFound
        }
    } catch (error) {
        return{
            message: `Server Error ${error}`,
            data: []
        }
    }
}

const findAllReceiverMessageBySenderPhoneNumber = async (phoneNumber) => {
    try {
        let responseFound = [];
        let senderDetails = await findUserByPhoneNumber(phoneNumber);

        let foundMessages =  Message.find({ sender: senderDetails._id });
        (await foundMessages).forEach((value)=>{
            responseFound.push(value)
        })
        if (responseFound.length === 0) {
            return {
                message: 'No release found',
                data: []
                }
        }
        return {
            message: `${responseFound.length} Messages Successfully Retrived`,
            data: responseFound
        }
    } catch (error) {
        return{
            message: `Server Error ${error}`,
            data: []
        }
    }
}

const findAllMessageByReceiverPhoneNumberAndSenderPhoneNumber = async (senderPhone, receiverPhone) => {
    try {
        let responseFound = [];

        let senderDetails = await findUserByPhoneNumber(senderPhone);
        let receiverDetails = await findUserByPhoneNumber(receiverPhone);

        let sender = senderDetails._id;
        let receiver = receiverDetails._id;
       let foundMessages =  Message.find({ $or: [{ sender, receiver }, { sender: receiver, receiver: sender }] });

        (await foundMessages).forEach((value)=>{
            responseFound.push(value)
        })
        if (responseFound.length === 0) {
            return {
                message: 'No release found',
                data: []
                }
        }
        return {
            message: `${responseFound.length} releases found`,
            data: responseFound
        }

        
    } catch (error) {
        return{
            message: `Server Error ${error}`,
            data: []
        }
    }
}

module.exports = { sendMessage, sendMessagesBySenderAndReceiverEmails, sendMessageBySenderAndReceiverPhoneNumber, findAllReceiverMessageByReceiverId, findAllMessageByReceiverIdAndSenderId, findAllSentMessagesBySenderId, findAllReceiverMessageByReceiverPhoneNumber, findAllReceiverMessageBySenderPhoneNumber, findAllMessageByReceiverPhoneNumberAndSenderPhoneNumber };
