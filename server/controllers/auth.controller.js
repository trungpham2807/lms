const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse.helper");
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const AWS = require("aws-sdk");
const SALT_ROUND = parseInt(process.env.SALT_ROUND)
const authController = {};
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION
}
const SES = new AWS.SES(awsConfig)

const {comparePassword, hashPassword} = require("../utils/auth.util")
/* Register controller 
check condition user model and hash password then create new model*/
authController.register = async (req, res) => {
//     const { name, email } = req.body;
//     let { password } = req.body;
//     let result;
//     try {
//         // validation
//         if(!name) return res.status(400).send("Name is required")
//         if(!password || password < 6 || password >64) return res.status(400).send("Password is required and min 6 char long with at least 1 alphabet") 
//         if(!email) return res.status(400).send("Email is required")
// //  Email already registered
//       const found = await User.findOne({ email });
//       if (found) return res.status(400).send("email already registered");
//       //encrypting password
//       const salt = await bcrypt.genSalt(SALT_ROUND);
//       password = await bcrypt.hash(password, salt);
//     // create new user collection
//       result = await User.create({ name, email, password });
//       return res.json({ok: true})
//     } catch (error) {
//       return res.status(400).send("error")
//     }
//     // return sendResponse(
//     //   res,
//     //   200,
//     //   true,
//     //   result,
//     //   false,
//     //   "Successfully create user"
//     // );
//     return res.status(200).send("Successfully created user");
try {
  // console.log(req.body);
  const { name, email, password } = req.body;
  // validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send("Password is required and should be min 6 characters long");
  }
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send("Email is taken");

  // hash password
  const hashedPassword = await hashPassword(password);

  // register
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  // console.log("saved user", user);
  return res.json({ ok: true });
} catch (err) {
  console.log(err);
  return res.status(400).send("Error. Try again.");
}
};

/* login controller
check password correct: take user pass -> hash -> compare with hash saved -> gen JWT -> send client */
  authController.login = async(req, res) => {
  //   // const {email, password} = req.body;
  //   // let result;
  //   // try{
  //   //     // check db already had an email
  //   //     if(!email || !password) return res.status(400).send("Email and Password required")
  //   //     const user = await User.findOne({email}).exec();
  //   //     if(!user) return res.status(400).send("No user found please register or try again");
  //   //             // check password
  //   //     let isMatch = await bcrypt.compare(password, user.password)
  //   //     if(!isMatch) return res.status(400).send("wrong password")

  //   //     // generate signed Token
  //   //         const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
  //   //         // console.log(token, "token")
  //   //         // //  return user and token to client (exclude hashed password)
  //   //         user.password = undefined;
  //   //         // // send token in cookie
  //   //         res.cookie("token", token, 
  //   //         {httpOnly: true, 
  //   //         // secure: true, //only work on https 
  //   //         })
  //   //     // accessToken = await user.generateToken();
  //   // //   send user and access token as json response
  //   //      res.json(user);
  //   //     //  return res.status(200).send("Login Successfully")


  //   // }catch(err){
  //   //     return res.status(400).send("Err. Try again")
  //   // }
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      // check if our db has user with that email
      const user = await User.findOne({ email }).exec();
      if (!user) return res.status(400).send("No user found");
      // check password
      const match = await comparePassword(password, user.password);
      if (!match) return res.status(400).send("Wrong password");
  
      // create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // console.log("tokennnnnnnn", token)
      // return user and token to client, exclude hashed password
      user.password = undefined;
      // send token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // only works on https
      });

      // send user as json response
      res.json({user, token});
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error. Try again.");
    }
  }
 


  authController.logout = async (req, res) => {

    try {
      res.clearCookie("token");
      return res.json({ message: "Signout success" });
    } catch (err) {
      console.log(err);
    }
  };
  authController.currentUser = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password").exec();
      // console.log("CURRENT_USER", user);
      // return res.json({ ok: true });
      return res.json(user)
    } catch (err) {
      console.log(err);
    }
  };


  // authController.sendTestEmail = async (req, res) => {
  //   const params = {
  //     Source: process.env.EMAIL_FROM,
  //     Destination: {
  //       ToAddresses: ["leonero2807@gmail.com"],
  //     },
  //     Message: {
  //       Body: {
  //         Html: {
  //           Charset: "UTF-8",
  //           Data: `
  //               <html>
  //                 <h1>Reset password</h1>
  //                 <p>User this code to reset your password</p>
  //                 <h2 style="color:red;">ghh</h2>
  //                 <i>edemy.com</i>
  //               </html>
  //             `,
  //         },
  //       },
  //       Subject: {
  //         Charset: "UTF-8",
  //         Data: "Reset Password",
  //       },
  //     },
  //   };
  //   const emailSent = await SES.sendEmail(params).promise()
  //   emailSent.then((data) => {
  //     res.json({ok: true})
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }
module.exports = authController;