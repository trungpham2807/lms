const express = require("express");
const router = express.Router();
const {uploadImage, removeImage, getCourse, createCourse,
uploadVideo} = require("../controllers/course.controller")
const formidable = require('express-formidable');
// Course
router.get("/", getCourse)
router.post("/upload-image", uploadImage)
router.post("/remove-image", removeImage)
router.post("/", createCourse)
// Lesson
router.post("/video-upload", formidable(), uploadVideo)
module.exports = router;