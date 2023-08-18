const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAdminLoginPage = (req, res) => {
  res.render('admin/login', { pageTitle: 'Admin Login', error: null, layout: false },);
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the admin user from the database (replace with your database query)
    const admin = { username: 'admin', password: '$2b$10$wqEoNW5Q.S4iJQVBH/E3cOs6Xc2Flzg8Wgj3PGyJq2lfFthwH3tkW' }; // Replace with actual data

    if (!admin) {
      throw new Error('Admin not found');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ username: admin.username }, process.env.ADMIN_TOKEN_SECRET, { expiresIn: '1h' });

    // Set the token as an HttpOnly cookie (replace with your actual cookie settings)
    res.cookie('adminToken', token, { httpOnly: true, secure: true });

    // Redirect to the admin dashboard
    res.redirect('/admin/dashboard');
  } catch (error) {
    // Login failed, render login page with error
    res.render('admin/login', { pageTitle: 'Admin Login', error: 'Invalid username or password' });
  }
};
