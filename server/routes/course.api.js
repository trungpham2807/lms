const express = require("express");
const router = express.Router();
const {getAllCourses, uploadImage, removeImage, getCourse, createCourse, editCourse, removeVideo,
uploadVideo, addLesson, removeLesson, updateLesson,
publishCourse, unpublishCourse, checkEnrollment, freeEnrollment, paidEnrollment, getUserCourses, getUserSingleCourse} = require("../controllers/course.controller")
const formidable = require('express-formidable');
// middleware
const authMiddleware = require("../middlewares/index")

// Course
//  get all courses
router.get('/all-courses', getAllCourses)


router.post("/",
authMiddleware.loginRequired,
authMiddleware.isInstructor, 
createCourse)
router.get("/:slug", 
// authMiddleware.loginRequired,
// authMiddleware.isInstructor,
getCourse)
router.put("/:slug",
authMiddleware.loginRequired,
authMiddleware.isInstructor,
 editCourse)


// handle image course
router.post("/upload-image", uploadImage)
router.post("/remove-image",removeImage)
// publish, unpublish single course
router.put("/publish/:courseId",
authMiddleware.loginRequired,
publishCourse
)
router.put("/unpublish/:courseId",
authMiddleware.loginRequired,
unpublishCourse
)
// Lesson
router.put("/:slug/:lessonId",
authMiddleware.loginRequired,
removeLesson
)

router.post("/lesson/:slug/:instructorId", 
authMiddleware.loginRequired,
addLesson)

router.put("/lesson/:slug/:instructorId", 
authMiddleware.loginRequired,
updateLesson)
// router.post("/lesson/:slug/:instructorId", 
// authMiddleware.loginRequired,
// updateLesson)
// router.post("/lesson/:slug/:lessonId", removeLesson)

// handle video lesson
router.post("/video-upload", formidable(), uploadVideo)
router.post("/video-remove", formidable(), removeVideo)

// check enrollment
router.get('/check-enrollment/:courseId', authMiddleware.loginRequired, checkEnrollment)
router.post('/free-enrollment/:courseId', authMiddleware.loginRequired, freeEnrollment)
router.post('/paid-enrollment/:courseId', authMiddleware.loginRequired, paidEnrollment)
router.get('/user-courses',authMiddleware.loginRequired, getUserCourses)
router.get('/user/course/:slug',authMiddleware.loginRequired, authMiddleware.isEnrolled, getUserSingleCourse)

module.exports = router;