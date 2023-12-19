const express = require('express');
const {uploadCity,fetchCity} = require('../controller/City');
const router = express.Router();
//login route
router.post("/upload",uploadCity);
router.get("/fetch",fetchCity)
module.exports = router;