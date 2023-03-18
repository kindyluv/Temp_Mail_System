const AppUser = require('../models/AppUser');
const appService = require('../services/AppUserService');

const createUser = (req, res)=>{
    console.log('request --> ', req.body);
    appService.createNewAppUser(req.body)
    .then((response) =>{
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

const findUserById = (req, res, next)=>{
    appService.findUserById(req.params.userId)
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

const findByEmail = (req, res, next) =>{
    appService.findUserByEmail(req.params.email)
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

const findAllUsers = (req, res, next) => {
    appService.findAllUsers()
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

module.exports = { createUser, findUserById, findByEmail, findAllUsers};