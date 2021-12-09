const express = require("express");
const router = express.Router();

const {getInstructorCourse} = require("../controllers/instructor.controller")

router.get("/instructor-courses", getInstructorCourse)

module.exports = router;