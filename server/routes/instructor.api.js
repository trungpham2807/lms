const express = require("express");
const router = express.Router();

const {getInstructorCourse, becomeInstructor} = require("../controllers/instructor.controller")
// middleware
const authMiddleware = require("../middlewares/index")

router.get("/instructor-courses",
 authMiddleware.loginRequired,
 getInstructorCourse)
// become instructor
router.post("/become-instructor", 
// authMiddleware.loginRequired,
 becomeInstructor)
//  get account status

module.exports = router;