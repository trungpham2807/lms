const express = require("express");
const router = express.Router();

const {getInstructorCourse, becomeInstructor, getAccountStatus} = require("../controllers/instructor.controller")
// middleware
const authMiddleware = require("../middlewares/index")

router.get("/instructor-courses",
 authMiddleware.loginRequired,
 getInstructorCourse)
// become instructor
router.post("/become-instructor", 
authMiddleware.loginRequired,
 becomeInstructor)
//  get account status
router.post("/get-account-status", 
authMiddleware.loginRequired,
getAccountStatus)
module.exports = router;