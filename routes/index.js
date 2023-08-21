const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const authCheckMiddleware = require('../middleware/authCheckMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/admin/adminController');

router.use(authCheckMiddleware);


// Define routes for admin functionality
router.get('/admin/login', adminController.getAdminLoginPage);
router.post('/admin/login', adminController.adminLogin);

// Define routes for user authentication
router.get('/dashboard', authMiddleware.requireAuth, authController.getDashboardPage);
router.get('/login', authController.getLoginPage);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

router.get('/', homeController.getHomePage);
router.get('/products', productController.viewProducts);

module.exports = router;
