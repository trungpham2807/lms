// // /* Protected middleware
// // verify if token valid -> send req to backend (browser will include cookie token in header auto*/
const User = require("../models/User")
const Course = require("../models/Course")
// const jwt = require('express-jwt');
const jwt = require("jsonwebtoken")
const authMiddleware = {};
// login required middle ware
// authMiddleware.getToken = jwt({
//     secret: Buffer.from("hello","base64"),
//     algorithms: ['RS256'],
//     credentialsRequired: false,
//     getToken: function fromHeaderOrQuerystring (req, res) {
//         console.log("herere")
//       if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//           console.log("token", req.headers.authorization.split(' ')[1])
//           return req.headers.authorization.split(' ')[1];
//       } else if (req.query && req.query.token) {
//         return req.query.token;
//       }
//       return null 
//     }           
// });
authMiddleware.loginRequired = (req, res, next) => {
        // console.log("err", req.token)
        // console.log("err", process.env.JWT_SECRET)
        // if (!req.token){
        //     return res.status(400).send("Token required.");
        // }
        try {
            const tokenString = req.headers.authorization;
            // console.log("tokenString", tokenString)
            if (!tokenString)
              return next(new Error("401 - Login required"));
            const token = tokenString.replace("Bearer ", "");
            // console.log("token", token)
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
              if (err) {
                if (err.name === "TokenExpiredError") {
                  return next(new Error("401 - Token expired"));
                } else { 
                    console.log("err", err)
                    return next(new Error("401 - Token invalid"));
                }
              }
              req.userId = payload._id;
            });
            next();
          } catch (error) {
            next(error);
          }
        };


// authMiddleware.loginRequired = (req, res) => {

// }

// check if instructor or not
authMiddleware.isInstructor = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId).exec();
        if(!user.role.includes("instructor")){
            return res.status(403).send("Only instructor can create course");
        }else{
            next()
        }
    }catch(err){
        console.log(err)
        return res.status(400).send("Error. Only Instructor can create course")
    }
}
// check if enrolled or not
authMiddleware.isEnrolled = async(req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const course = await Course.findOne({ slug: req.params.slug }).exec();

    // check if course id is found in user courses array
    let ids = [];
    for (let i = 0; i < user.courses.length; i++) {
      ids.push(user.courses[i].toString());
    }

    if (!ids.includes(course._id.toString())) {
      res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};


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