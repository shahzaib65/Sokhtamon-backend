const express = require('express');
const {uploadJob,fetchJob,fetchJobById} = require('../controller/Job');
const router = express.Router();
//login route
router.post("/upload",uploadJob);
router.get("/fetch",fetchJob)
router.get("/fetch/:id",fetchJobById)
module.exports = router;