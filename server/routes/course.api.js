const express = require("express");
const router = express.Router();
const {uploadImage, removeImage, getCourse, createCourse} = require("../controllers/course.controller")

router.get("/", getCourse)
router.post("/upload-image", uploadImage)
router.post("/remove-image", removeImage)
router.post("/", createCourse)
module.exports = router;