const User = require("../models/User")
const Course = require("../models/Course")
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const queryString = require("query-string")
const instructorController = {};

instructorController.getInstructorCourse = async (req, res) => {
    try{
        const courses = await Course.find({instructor : req.userId})
        .populate("instructor")
        .sort({createAt: -1})
        .exec();
        res.json(courses)
        console.log("hahaha", courses)
        // res.status(200).send("Success get course")
    }catch(err){
        console.log(err)
        res.status(400).send("Error get course")
    }
}
// become instructor
// find user from db -> check user have account payment -> create new one
// -< create account link based account id -> pre-fill info -> send url -> send account link
instructorController.becomeInstructor = async (req, res) => {
    try {
        // 1. find user from db
        const user = await User.findById(req.userId).exec();
        console.log("user become instructor", user)
        // 2. if user dont have stripe_account_id yet, then create new
        if (!user.stripe_account_id) {
          const account = await stripe.accounts.create({ type: "express" });
          // console.log('ACCOUNT => ', account.id)
          user.stripe_account_id = account.id;
          user.save();
        }
        // 3. create account link based on account id (for frontend to complete onboarding)
        let accountLink = await stripe.accountLinks.create({
          account: user.stripe_account_id,
          refresh_url: process.env.STRIPE_REDIRECT_URL,
          return_url: process.env.STRIPE_REDIRECT_URL,
          type: "account_onboarding",
        });
        //  console.log(accountLink)
        // 4. pre-fill any info such as email (optional), then send url resposne to frontend
        accountLink = Object.assign(accountLink, {
          "stripe_user[email]": user.email,
        });
        // 5. then send the account link as response to fronend
        res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
      } catch (err) {
        console.log("MAKE INSTRUCTOR ERR ", err);
      }
    };
module.exports = instructorController;