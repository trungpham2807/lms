const express = require("express");
const router = express.Router();
const {
    register,
    login,
    logout,
    currentUser
} = require('../controllers/auth.controller') 

// middleware
const {loginRequired} = require("../middlewares/authentication")

// Register route
router.post("/register", register)
// login
router.post("/login", login)

// current user
router.get('/current-user', loginRequired, currentUser )
//logout
router.get("/logout", logout)
module.exports = router;