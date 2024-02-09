const express = require('express');
const { createPost, getAllPosts, getPostById } = require('../controller/post-controller');
const router = express.Router();

router.post("/create-post", createPost);
router.get("/all-post", getAllPosts);
router.get("/all-post/:id", getPostById);

module.exports = router;