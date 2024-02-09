const express = require('express');
const { createPost, getAllPosts } = require('../controller/post-controller');
const router = express.Router();

router.post("/create-post", createPost);
router.get("/all-post", getAllPosts);

module.exports = router;