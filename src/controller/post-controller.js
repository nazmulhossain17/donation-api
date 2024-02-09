const prisma = require("../../prisma");

const createPost = async (req, res) => {
  try {
    const { image, title, description, price, userId } = req.body;

    // Check if user with userId exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has admin role
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Only admins can create posts.' });
    }

    // Create post
    const newPost = await prisma.post.create({
      data: {
        image,
        title,
        description,
        price,
        userId,
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
  

module.exports = { createPost, getAllPosts, getPostById };
