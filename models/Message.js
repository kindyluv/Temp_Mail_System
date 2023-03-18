const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    sender:{
        type: Schema.Types.ObjectId,
        ref: 'AppUser'
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: 'AppUser'
    },
    messageTitle: {
        type: String
    },
    
    messageBody: {
        type: String
    },
    createdAt: { 
        type: Date, default: Date.now 
    }

})

const Message = model("Message", messageSchema);
module.exports = Message;