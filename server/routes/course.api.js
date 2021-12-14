const express = require("express");
const router = express.Router();
const {uploadImage, removeImage, getCourse, createCourse, editCourse, removeVideo,
uploadVideo, addLesson, removeLesson, updateLesson} = require("../controllers/course.controller")
const formidable = require('express-formidable');
// middleware
const authMiddleware = require("../middlewares/index")

// Course
router.get("/:slug", 
authMiddleware.loginRequired,
// authMiddleware.isInstructor,
getCourse)
router.post("/",
authMiddleware.loginRequired,
// authMiddleware.isInstructor, 
createCourse)
router.put("/:slug",
authMiddleware.loginRequired,
// authMiddleware.isInstructor,
 editCourse)
// handle image course
router.post("/upload-image", 
uploadImage)
router.post("/remove-image",
removeImage)
// Lesson
router.post("/lesson/:slug/:instructorId", 
authMiddleware.loginRequired,
addLesson)
// router.post("/lesson/:slug/:instructorId", 
// authMiddleware.loginRequired,
// updateLesson)
// router.post("/lesson/:slug/:lessonId", removeLesson)

// handle video lesson
router.post("/video-upload", formidable(), uploadVideo)
router.post("/video-remove", formidable(), removeVideo)


module.exports = router;