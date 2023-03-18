const mongoose = require('mongoose');
const Address = require('./Address');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const appUserSchema = new Schema({
    // _id: {
    //     type: String
    // },
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
        type: String
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

appUserSchema.methods.comparePassword = async function (attempt, next) {
    try {
        return await bcrypt.compare(attempt, this.password)
    } catch (error) {
        return next(error);
    }
}

const AppUser = mongoose.model('AppUser', appUserSchema);

module.exports = AppUser;
