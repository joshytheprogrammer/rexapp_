const Product = require('../models/Product'); // Import the Product model
const Category = require('../models/Category'); // Import the Category model

exports.getHomePage = async (req, res) => {
  try {
    // Fetch popular products
    const popularProducts = await Product.find().limit(5);

    // Fetch recently added products
    const recentlyAddedProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

    // Fetch trending categories
    const trendingCategories = await Category.find().limit(5);

    // Render the home page template with fetched data
    res.render('index', {
      pageTitle: 'Home',
      popularProducts,
      recentlyAddedProducts,
      trendingCategories,
      content: ''
    });
  } catch (error) {
    console.error('Error fetching data for home page:', error);
    // Render the "error" view with the error message
    res.render('error', { message: 'Error fetching data for home page' });
  }
};


