const User = require("../models/User")
const Course = require("../models/Course")
const instructorController = {};

instructorController.getInstructorCourse = async (req, res) => {
    try{
        const courses = await Course.find({instructor: req.userId})
        .sort({createAt: -1})
        .exec();
        res.json(courses)
        // res.status(200).send("Success get course")
    }catch(err){
        console.log(err)
        res.status(400).send("Error get course")
    }
}
module.exports = instructorController;