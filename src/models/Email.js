const { Schema, model, Types } = require('mongoose');

const emailSchema = new Schema({
    _id: String,
    sender: String,
    recipient: String,
    subject: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
  });

  emailSchema.pre('save', function(next){
    if(!this._id){
      this._id = new Types.ObjectId().toString();
    }
    return next();
  })
  
  const Email = model('Email', emailSchema);
  module.exports = { Email };