const express = require("express");
const router = express.Router();
const {uploadImage, postCourse} = require("../controllers/course.controller")

router.post("/", postCourse)
router.post("/upload-image", uploadImage)
module.exports = router;