// authCheckMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decodedToken.userId);

      if (user) {
        req.user = user; // Attach the user to the request object
      }
    }

    next();
  } catch (error) {
    next(); // Continue to the next middleware/route without redirecting
  }
};
