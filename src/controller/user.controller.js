const bcrypt = require("bcrypt")
const prisma = require("../../prisma/index")


const handleRegister = async(req, res) =>{
    const { name, email, password } = req.body;
    console.log(name)
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
      
          if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
      
          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          });
      
          res.status(201).json({message: "account created successful", user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
}

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }


    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {handleRegister, handleLogin}