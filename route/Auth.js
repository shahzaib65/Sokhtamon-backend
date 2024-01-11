const express = require('express');
const { loginUser,verifyOtp,fetchUser} = require('../controller/Auth');
const fetchToken = require("../middleware/fetchUser")
const router = express.Router();
//login route
router.post("/login",loginUser);
router.post("/verifyOtp",verifyOtp)
router.get("/fetch",fetchToken,fetchUser)




module.exports = router;