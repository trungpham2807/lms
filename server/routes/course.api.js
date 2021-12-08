const express = require("express");
const router = express.Router();
const {uploadImage, removeImage, postCourse} = require("../controllers/course.controller")

router.post("/", postCourse)
router.post("/upload-image", uploadImage)
router.post("/remove-image", removeImage)
module.exports = router;