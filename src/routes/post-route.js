const express = require('express');
const { createPost } = require('../controller/post-controller');
const router = express.Router();

router.post("/create-post", createPost);

module.exports = router;