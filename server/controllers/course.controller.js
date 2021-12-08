
const sendResponse = require("../helpers/sendResponse.helper");

const Course = require("../models/Course")


const courseController = {};
courseController.uploadImage = async (req, res) => {
    res.send("ok")
}
module.exports = courseController;