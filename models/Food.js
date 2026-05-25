const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // Keeps track of when you added the items
});

// Mongoose will pluralize this to a 'foods' collection in your amaiaorders DB
module.exports = mongoose.model('Food', foodSchema);