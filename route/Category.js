const express = require('express');
const {uploadCategory,fetchCategory,updateCategory,deleteCategory} = require('../controller/Category');
const router = express.Router();
//login route
router.post("/upload",uploadCategory);
router.get("/fetch",fetchCategory)
router.put("/update/:id",updateCategory)
router.delete('/delete/:id',deleteCategory)


module.exports = router;