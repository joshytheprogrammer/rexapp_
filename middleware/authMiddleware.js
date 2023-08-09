const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      console.log("No token");
      throw new Error('Authentication required');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    console.error(error);
    res.redirect('/login'); // Redirect to the login page
  }
};
