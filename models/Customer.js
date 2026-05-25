const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Tracks when a customer was first added
});

module.exports = mongoose.model('Customer', customerSchema);