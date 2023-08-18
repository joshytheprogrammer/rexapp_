const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Controller for rendering the login page or redirecting to dashboard if already logged in.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getLoginPage = (req, res) => {
  if (!req.cookies.token) {
    res.render('login', { pageTitle: 'Login', error: null, user: req.user });
    return;
  }
  res.redirect('/dashboard');
};

/**
 * Controller for rendering the register page or redirecting to dashboard if already logged in.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getRegisterPage = (req, res) => {
  if (!req.cookies.token) {
    res.render('register', { pageTitle: 'Register', error: null, user: req.user });
    return;
  }
  res.redirect('/dashboard');
};

/**
 * Controller for rendering the dashboard page.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getDashboardPage = (req, res) => {
  const userName = req.user.username; 

  res.render('dashboard', { pageTitle: 'Dashboard', userName });
};

/**
 * Controller for user login.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).render('login', { pageTitle: 'Login', error: 'Invalid email or password' });
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).render('login', { pageTitle: 'Login', error: 'Invalid email or password' });
    }
    
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

    // Set the token as an HttpOnly cookie
    res.cookie('token', token, { httpOnly: true });
    
    res.redirect('/dashboard'); 
  } catch (error) {
    res.status(500).render('login', { pageTitle: 'Login', error: 'An error occurred during login. Please try again.' });
  }
};

/**
 * Controller for user registration.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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
    res.status(500).render('register', { pageTitle: 'Register', error: 'An error occurred during registration. Please try again.' });
  }
};

/**
 * Controller for user logout.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.logoutUser = (req, res) => {
  try {
    // Clear the token cookie by setting an expired date in the past
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.redirect('/'); 
  } catch (error) {
    res.status(500).render('dashboard', { pageTitle: 'Dashboard', userName: req.user.username, error: 'An error occurred during logout. Please try again.' });
  }
};
