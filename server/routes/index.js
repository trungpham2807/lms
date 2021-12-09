/* all routes here */
const express = require('express');
const router = express.Router();

// Test backend
router.get("/", (req, res) => {
    res.send("this is BE")
})

// authRoute
const authRoutes = require("./auth.api");
router.use("/auth", authRoutes);

// courseRoute
const courseRoutes = require("./course.api");
router.use("/course", courseRoutes);

// instructorRoute
const instructorRoutes = require("./instructor.api");
router.use("/instructor", instructorRoutes);
module.exports = router;