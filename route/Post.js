const express = require('express');
const {uploadPost,fetchPost,fetchPostById,updatePost,deletePost,fetchAllPosts} = require('../controller/Post');
const router = express.Router();
//login route
router.post("/upload",uploadPost);
router.get("/fetch",fetchPost);
router.post("/fetch/:id",fetchPostById)
router.put("/update/:id",updatePost)
router.delete("/delete/:id",deletePost)
router.get("/all",fetchAllPosts)
module.exports = router;