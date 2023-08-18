const Product = require('../models/Product'); // Import the Product model
const Category = require('../models/Category'); // Import the Category model

/**
 * Controller for rendering the home page.
 * Fetches popular products, recently added products, and trending categories.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getHomePage = async (req, res) => {
  try {
    // Fetch popular products
    const popularProducts = await Product.find().limit(5);

    // Fetch recently added products
    const recentlyAddedProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

    // Fetch trending categories
    const trendingCategories = await Category.find().limit(5);

    // Get the user object from the request (if present)
    const user = req.user;

    // Render the home page template with fetched data and user object
    res.render('index', {
      pageTitle: 'Home',
      popularProducts,
      recentlyAddedProducts,
      trendingCategories,
      user, // Pass the user object to the template
      content: ''
    });
  } catch (error) {
    console.error('Error fetching data for home page:', error);
    // Render the "error" view with the error message
    res.render('error', { message: 'Error fetching data for home page' });
  }
};
