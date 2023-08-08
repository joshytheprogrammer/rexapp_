const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

require('dotenv').config();

// Connect to the MongoDB database
mongoose.connect(process.env.DEV_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Delete all documents in categories and products collections
async function deleteDocuments() {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Documents deleted successfully.');
  } catch (error) {
    console.error('Error deleting documents:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run the delete documents function
deleteDocuments();
