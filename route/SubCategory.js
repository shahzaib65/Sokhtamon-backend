const express = require('express');
const {uploadSubCategory,fetchSubCategory} = require('../controller/SubCategory');
const router = express.Router();
//login route
router.post("/upload",uploadSubCategory);
router.get("/fetch",fetchSubCategory)


module.exports = router;