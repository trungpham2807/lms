
const User = require("../models/User")
const Course = require("../models/Course")
const jwt = require("jsonwebtoken")

const authMiddleware = {};
authMiddleware.loginRequired = async (req, res, next) => {
    try{

    }catch(err){

    }
}
authMiddleware.isInstructor = async (req, res, next) => {
    try{

    }catch(err){

    }
}

authMiddleware.isEnrolled = async(req, res, next) => {
    try{

    }catch(err){

    }
}
module.exports = authMiddleware;