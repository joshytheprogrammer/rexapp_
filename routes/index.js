const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController'); // Add this line

// Define the root route for the home page
router.get('/', homeController.getHomePage);

// Define a route for viewing products
router.get('/products', productController.viewProducts);

// Define routes for user authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
