const prisma = require("../../prisma");

const createPost = async (req, res) => {
  try {
    const { image, title, description, price } = req.body;

    // Check if user with userId exists
    // const user = await prisma.user.findUnique({
    //   where: { id: userId },
    // });

    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // // Check if user has admin role
    // if (user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Permission denied. Only admins can create posts.' });
    // }

    // Create post
    const newPost = await prisma.post.create({
      data: {
        image,
        title,
        description,
        price,
        
      },
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          user: true, // Include user information in the response
        },
      });
  
      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error });
    }
  };

  const deletePost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const deletedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { image, title, description, price } = req.body;
  
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          image,
          title,
          description,
          price,
          updatedAt: new Date(), // Update the 'updatedAt' field to the current timestamp
        },
      });
  
      res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getPostById = async (req, res) => {
    try {
      const postId = req.params.id; // Assuming the post id is passed as a route parameter
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          user: true, // Include user information in the response
        },
      });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json({ post });
    } catch (error) {
      console.error('Error fetching post by id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const handleDonation = async (req, res) => {
    const { postId, userId, amount } = req.body;
  
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the post exists
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Update the donation amount
      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          amountRaised: post.amountRaised + amount, // Update the amountRaised field
        },
      });
  
      // Create a record of the donation
      await prisma.userDonation.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          donation: {
            connect: {
              id: postId,
            },
          },
          amount,
        },
      });
  
      res.status(200).json({ message: 'Donation successful', updatedPost });
    } catch (error) {
      console.error('Error during donation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  

module.exports = { createPost, getAllPosts, handleDonation, getPostById, updatePost, deletePost };
