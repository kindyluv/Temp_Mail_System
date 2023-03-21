const { Schema, model, Types } = require('mongoose');

const messageSchema = new Schema({
    _id:{
        type: String
    },
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
    }
    // ,
    // notifications:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Notification'
    // }
    ,
    createdAt: { 
        type: Date, default: Date.now 
    }

})

messageSchema.pre('save', function(next){
    if(!this._id){
        this._id = new Types.ObjectId().toString();
    }
    return next();
})

const Message = model("Message", messageSchema);
module.exports = Message;