const express = require('express');
const { loginUser,verifyOtp,fetchUser,checkAuth,loginWithfirebaseOtp,updateProfile,logout} = require('../controller/Auth');
const router = express.Router();
//login route
router.post("/login",loginUser);
router.post("/verifyOtp",verifyOtp)
router.get("/fetch/:id",fetchUser)
router.get("/check",checkAuth)
router.post("/loginwithMobile",loginWithfirebaseOtp)
router.post("/update",updateProfile)
router.post("/logout",logout)




module.exports = router;