const express = require('express');
const { loginUser,verifyOtp,fetchUser,checkAuth,loginWithfirebaseOtp} = require('../controller/Auth');
const fetchToken = require("../middleware/fetchUser")
const router = express.Router();
//login route
router.post("/login",loginUser);
router.post("/verifyOtp",verifyOtp)
router.get("/fetch",fetchToken,fetchUser)
router.get("/check",checkAuth)
router.post("/loginwithMobile",loginWithfirebaseOtp)




module.exports = router;