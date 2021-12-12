const express = require("express");
const router = express.Router();
const {uploadImage, removeImage, getCourse, createCourse, removeVideo,
uploadVideo} = require("../controllers/course.controller")
const formidable = require('express-formidable');
// middleware
const authMiddleware = require("../middlewares/index")

// Course
router.get("/courses", getCourse)
router.post("/upload-image",  uploadImage)
router.post("/remove-image", removeImage)
router.post("/", createCourse)
// Lesson
router.post("/video-upload", formidable(), uploadVideo)
router.post("/video-remove", formidable(), removeVideo)

module.exports = router;