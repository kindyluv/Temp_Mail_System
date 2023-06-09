const AppUser = require('../models/AppUser');
const { saveNewAddress } = require('./AddressService');

const createNewAppUser = async (request)=>{

    let savedAddress = saveNewAddress(request.address);
    try {
        let newAppUser = new AppUser({
            userName: request.userName,
            firstName: request.firstName,
            lastName: request.lastName,
            email: emailGenerator(request.firstName, request.lastName),
            phoneNumber: request.phoneNumber,
            password: request.password,
            gender: request.gender,
            address: savedAddress._id
        })
        let savedUser = await newAppUser.save()

        let response = {
            userName: savedUser.userName,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            phoneNumber: savedUser.phoneNumber,
            password: savedUser.password,
            gender: savedUser.gender
        }


        return {
            message: 'User Successfully Created',
            data: response
        }
        
    } catch (error) {
        return{
            message: `Internal Server Error ${error}`,
            data: 'Try Again'
        };
    }
}

const emailGenerator = (firstName, lastName) => {
    let fWord = firstName.charAt(Math.floor(Math.random() * firstName.length))
    let generatedEmail = fWord + lastName.toLowerCase().substring(0, lastName.length) + '@emailgen.com';
    console.log(generatedEmail);
    return generatedEmail;
}

const findUserById = async (userId) =>{
    try {
        let foundUser = AppUser.findById(userId);
        return foundUser;
    } catch (error) {
        return {
            message: `User with id ${userId} not found`,
            data: 'Please Enter a valid user id'
        }
    }
}

const findUserByEmail = async (userEmail)=>{
    try {
        return await AppUser.findOne({ email: userEmail })
    } catch (error) {
        return{
            message: `No User found with this email ${userEmail}`,
            data: 'No data'
        }
    }
}

const findAllUsers = async () =>{
    return AppUser.find()
    .then((response)=>{
        return {
            message: "Successfully retrived all users from db",
            data: response
        }
    })
    .catch((error)=>{
        return {
            message: `Db is empty ${error}`,
            data: []
        }
    })
}

const findUserByPhoneNumber = async (phoneNumber) => {
    try {
        let foundUser = await AppUser.findOne({ phoneNumber: phoneNumber });
        console.log('found user --> ', foundUser);
        return foundUser;
    } catch (error) {
        return{
            message: `No User found with this phoneNumber ${phoneNumber}`,
            data: 'No data'
        }
    }
}

module.exports = { createNewAppUser, findUserById, findUserByEmail, findAllUsers, findUserByPhoneNumber };