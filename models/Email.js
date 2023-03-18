const { Schema, model } = require('mongoose');

const emailSchema = new Schema({
    sender: String,
    recipient: String,
    subject: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
  });
  
  const Email = model('Email', emailSchema);
  module.exports = { Email };