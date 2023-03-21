const mongoose = require('mongoose');
const Address = require('./Address');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const appUserSchema = new Schema({
    _id: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
}, {timestamps: true})

appUserSchema.pre('save', async function (next) {
    try{
        if(!this._id){
            this._id = new mongoose.Types.ObjectId().toString();
        }
        
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }catch(error){
        return next(error);
    }
})

appUserSchema.methods.validatePassword = async function(password, next){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return next(error);
    }
}

const AppUser = mongoose.model('AppUser', appUserSchema);

module.exports = AppUser;



/*

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, 'privatekey');
  return token;
}

const User = mongoose.model('User', userSchema);

app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

*/
