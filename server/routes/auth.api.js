const express = require("express");
const router = express.Router();
const {
    register,
    login
} = require('../controllers/auth.controller') 



// Register route
router.post("/register", register)

router.post("/login", login)
// router.post("/login/google", (req, res) => {
//     res.send("login with google")
// })
module.exports = router;