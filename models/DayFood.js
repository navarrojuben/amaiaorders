const mongoose = require('mongoose');

const dayFoodSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  name: { type: String, required: true, trim: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  price: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('DayFood', dayFoodSchema);