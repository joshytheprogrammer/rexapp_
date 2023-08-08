const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');

require('dotenv').config();

// Connect to the MongoDB database
mongoose.connect(process.env.DEV_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read data from data.json
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Seed categories
async function seedCategories() {
  try {
    await Category.insertMany(data.categories);
    console.log('Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}

// Seed products
async function seedProducts() {
  try {
    await Product.insertMany(data.products);
    console.log('Products seeded successfully.');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Seed database
async function seedDatabase() {
  await seedCategories();
  await seedProducts();
}

// Run the seeding function
seedDatabase();