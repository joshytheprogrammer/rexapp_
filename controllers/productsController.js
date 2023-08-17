const Product = require('../models/Product'); // Import the Product model

/**
 * Controller for viewing all available products.
 * Fetches all products from the database and renders the "view products" template.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.viewProducts = async (req, res) => {
  const pageTitle = 'Available Products';
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Render the "view products" template with the fetched products
    res.render('products', { pageTitle, products, content: '' });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Handle errors and render an error page
    res.render('error', { message: 'Error fetching products' });
  }
};
