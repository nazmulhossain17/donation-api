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

module.exports = { createPost };
