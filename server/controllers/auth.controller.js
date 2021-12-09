const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse.helper");
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const SALT_ROUND = parseInt(process.env.SALT_ROUND)

const authController = {};

/* Register controller 
check condition user model and hash password then create new model*/
authController.register = async (req, res) => {
    const { name, email } = req.body;
    let { password } = req.body;
    let result;
    try {
        // validation
        if(!name) return res.status(400).send("Name is required")
        if(!password || password < 6 || password >64) return res.status(400).send("Password is required and min 6 char long with at least 1 alphabet") 
        if(!email) return res.status(400).send("Email is required")
//  Email already registered
      const found = await User.findOne({ email });
      if (found) return res.status(400).send("email already registered");
      //encrypting password
      const salt = await bcrypt.genSalt(SALT_ROUND);
      password = await bcrypt.hash(password, salt);
    // create new user collection
      result = await User.create({ name, email, password });
    } catch (error) {
      return next(error);
    }
    // return sendResponse(
    //   res,
    //   200,
    //   true,
    //   result,
    //   false,
    //   "Successfully create user"
    // );
    return res.status(200).send("Successfully created user");
  };
/* login controller
check password correct: take user pass -> hash -> compare with hash saved -> gen JWT -> send client */
  authController.login = async(req, res) => {
    const {email, password} = req.body;
    let result;
    try{
        // check db already had an email
        if(!email || !password) return res.status(400).send("Email and Password required")
        const user = await User.findOne({email});
        if(!user) return res.status(400).send("No user found please register or try again");
                // check password
        let isMatch = await bcrypt.compare(password, user.password)
        // generate signed Token
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
            console.log(token)
            //  return user and token to client (exclude hashed password)
            user.password = undefined;
            // send token in cookie
            res.cookie("token", token, 
            {httpOnly: true, 
            // secure: true, //only work on https 
            })
        if(!isMatch) return res.status(400).send("wrong password")
        // accessToken = await user.generateToken();
    //   send user and access token as json response
         res.json({user, token});
         return res.status(200).send("Login Successfully")


    }catch(err){
        return res.status(400).send("Err. Try again")
    }
  }
  authController.logout = async (req, res) => {
    try{
      res.clearCookie("token");
      return res.status(200).send("success logout")
    }catch(err){
      console.log(err)
    }
  }
module.exports = authController;