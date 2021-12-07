const bcrypt = require("bcrypt");
// const sendResponse = require("../helpers/sendResponse.helper");

const User = require("../models/User")
const SALT_ROUND = parseInt(process.env.SALT_ROUND)
const authController = {};

authController.register = async (req, res) => {
    const { name, email } = req.body;
    let { password } = req.body;
    let result;
    try {
        // validation
        if(!name) return res.status(400).send("Name is required")
        if(!password || password < 5 || password >64) return res.status(400).send("Password is required and min 6 char long") 
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
module.exports = authController;