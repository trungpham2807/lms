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
    const user = await User.findById(req.userId).select("-password").exec();
    console.log("222222", user)
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

     console.log(accountLink)
    // 4. pre-fill any info such as email (optional), then send url response to frontend
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });
    const statusUpdated = await User.findByIdAndUpdate(
      user._id,
      {
        stripe_seller: user.stripe_account_id,
        $addToSet: { role: "instructor" },
      },
      { new: true }
    )
      .select("-password")
      .exec();
    // 5. then send the account link as response to front-end
    // res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
    res.send(`${accountLink.url}`)
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR ", err);
  }
};
instructorController.getAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log("ACCOUNT => ", account);
    if (!account.charges_enabled) {
      return res.status(401).send("Unauthorized");
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          $addToSet: { role: "instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec();
      res.json(statusUpdated);
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = instructorController;