const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes for user authentication
router.get('/login', authController.getLoginPage);
router.get('/register', authController.getRegisterPage);
router.get('/dashboard', authMiddleware, authController.getDashboardPage);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

// Define other routes here
router.get('/dashboard', authMiddleware, (req, res) => {
  res.send("Hello world");
});

router.get('/', homeController.getHomePage);
router.get('/products', productController.viewProducts);

module.exports = router;
