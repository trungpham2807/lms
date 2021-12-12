const express = require("express");
const router = express.Router();
const {
    register,
    login,
    logout,
    currentUser,
    // sendTestEmail
} = require('../controllers/auth.controller') 

// middleware
const authMiddleware = require("../middlewares/index")

// Register route
router.post("/register", register)
// login
router.post("/login", login)

// current user
router.get('/current-user', 
authMiddleware.loginRequired,
 currentUser )
//logout
router.get("/logout", logout)
// reset password
// router.get("/send-email", sendTestEmail)

module.exports = router;