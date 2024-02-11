const express = require('express');
const { createPost, getAllPosts, getPostById, deletePost, updatePost, donatePost, deleteDonation, getAllDonations } = require('../controller/post-controller');
const router = express.Router();

router.post("/create-post", createPost);
router.post("/create-donation", donatePost);
router.get("/all-post", getAllPosts);
router.get("/all-donation", getAllDonations);
router.get("/all-post/:id", getPostById);
router.put("/posts/:postId", updatePost);
router.delete("/delete-post/:postId", deletePost);
router.delete("/delete-donation/:donateId", deleteDonation);
// router.post('/donate', handleDonation)

module.exports = router;