const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // Used for URLs
  imageURL: { type: String, required: true, unique: true }, // Used for URLs
  // description: { type: String },
  // ... other fields as needed
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
