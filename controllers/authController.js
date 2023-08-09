const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controller for user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    res.json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Controller for user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
    
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
