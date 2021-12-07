const express = require("express");
const router = express.Router();
const {
    register
} = require('../controllers/auth.controller') 



// Register route
router.post("/register", register)

router.get("/login", (req, res) => {
    res.send("login")
})

// router.post("/login/google", (req, res) => {
//     res.send("login with google")
// })
module.exports = router;