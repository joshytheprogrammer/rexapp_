const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

require('dotenv').config();

// Connect to the MongoDB database
mongoose.connect(process.env.DEV_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample categories and products data
const categoriesData = [
  { name: 'Engine Parts', slug: 'engine-parts', imageURL: 'engine-parts.jpg' },
  { name: 'Brake System', slug: 'brake-system', imageURL: 'brake-system.jpg' },
  // ... add more categories
];

const productsData = [
  {
    name: 'Spark Plug',
    category: 'Engine Parts',
    manufacturer: 'AutoTech',
    description: 'High-quality spark plug for efficient combustion.',
    price: 9.99,
    stock: 100,
    imageURL: 'spark-plug.jpg',
  },
  {
    name: 'Brake Pad',
    category: 'Brake System',
    manufacturer: 'BrakeMaster',
    description: 'Durable brake pad for safe and effective braking.',
    price: 29.99,
    stock: 50,
    imageURL: 'brake-pad.jpg',
  },
  // ... add more products
];

// Populate categories and products
async function seedDatabase() {
  try {
    for (const categoryData of categoriesData) {
      await Category.create(categoryData);
    }

    for (const productData of productsData) {
      await Product.create(productData);
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run the seeding function
seedDatabase();
