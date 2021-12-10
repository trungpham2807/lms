/* Protected middleware
verify if token valid -> send req to backend (browser will include cookie token in header auto*/
const User = require("../models/User")
const Course = require("../models/Course")
const expressJwt = require("express-jwt")

const authMiddleware = {};
// login required middle ware
authMiddleware.loginRequired = expressJwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["H256"]
})
// check if instructor or not
authMiddleware.isInstructor = async (req, res, next) => {
    try{

    }catch(err){

    }
}
// check if enrolled or not
authMiddleware.isEnrolled = async(req, res, next) => {
    try{

    }catch(err){

    }
}
module.exports = authMiddleware;