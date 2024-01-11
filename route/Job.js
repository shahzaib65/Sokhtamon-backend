const express = require('express');
const {uploadJob,fetchJob} = require('../controller/Job');
const router = express.Router();
//login route
router.post("/upload",uploadJob);
router.get("/fetch",fetchJob)
module.exports = router;