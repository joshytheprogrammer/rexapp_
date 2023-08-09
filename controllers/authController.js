const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controller for User pages
exports.getLoginPage = (req, res) => {
  res.render('login', { pageTitle: 'Login' });
};


exports.getRegisterPage = (req, res) => {
  res.render('register', { pageTitle: 'Register' });
};

exports.getDashboardPage = (req, res) => {
  const userName = req.user.username; 

  res.render('dashboard', { pageTitle: 'Dashboard', userName });
};


// Controller for user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Redirect to the login page after successful registration
    res.redirect('/login'); 

  } catch (error) {
    console.log(error)
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

    // Set the token as an HttpOnly cookie
    res.cookie('token', token, { httpOnly: true });
    
    res.redirect('/dashboard'); 
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Controller for user logout
exports.logoutUser = (req, res) => {
  try {
    // Clear the token cookie by setting an expired date in the past
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.redirect('/'); 
  } catch (error) {
    res.status(500).json({ error: 'Error logging out' });
  }
};