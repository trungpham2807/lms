const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is BE")
})
const authRoutes = require("./auth.api");
router.use("/auth", authRoutes);

module.exports = router;