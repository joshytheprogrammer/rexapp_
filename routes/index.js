const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const homeController = require('../controllers/homeController');

// Define a route for viewing products

// Define the root route for the home page
router.get('/', homeController.getHomePage);

router.get('/products', productController.viewProducts);

module.exports = router;
