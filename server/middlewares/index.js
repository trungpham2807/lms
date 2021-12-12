// // /* Protected middleware
// // verify if token valid -> send req to backend (browser will include cookie token in header auto*/
const User = require("../models/User")
const Course = require("../models/Course")
const jwt = require('express-jwt');
const authMiddleware = {};
// login required middle ware
authMiddleware.loginRequired = jwt({
    // getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    function(req, res) {
        req.cookies.token
        res.sendStatus(200);}
  });

// authMiddleware.loginRequired = (req, res) => {

// }

// check if instructor or not
authMiddleware.isInstructor = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id).exec();
        if(!user.role.includes("Instructor")){
            return res.sendStatus(403);
        }else{
            next()
        }
    }catch(err){
        console.log(err)
    }
}
// check if enrolled or not
// authMiddleware.isEnrolled = async(req, res, next) => {
//     try{

//     }catch(err){

//     }
// }


module.exports = authMiddleware;


// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const JWT_SECRET = process.env.JWT_SECRET;
// const authMiddleware = {};

// authMiddleware.loginRequired = async (req, res, next) => {
//   try {
//     const headerToken = req.headers.authorization;
//     if (!headerToken)
//       throw new Error("Missing access token in request's header");
//     const token = headerToken.split(" ")[1];
//     const decrypted = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decrypted._id);
//     req.currentUser = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = authMiddleware;