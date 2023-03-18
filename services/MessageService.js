const Message = require("../models/message");

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
            message: `${responseFound.length} releases found`,
            data: responseFound
        }
        // return{
        //     message: 'Messages Successfully Retrived',
        //     data: response
        // }

        // Message.find({ receiver: receiverId })
        // .populate('sender')
        // .exec((error, messages) => {
        //   if (error) {
        //     console.error(error);
        //   } else {
        //     console.log();
        //   }
        // });
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
        // Message.find({ sender: senderId, receiver: receiverId })
        // .populate('senderId', 'firstName')
        // .populate('receiverId', 'firstName')
        // .sort('createdAt')
        // .exec((err, messages) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log(messages);
        //     }
        // });
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

module.exports = { sendMessage, findAllReceiverMessageByReceiverId, findAllMessageByReceiverIdAndSenderId };
