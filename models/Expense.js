const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  name: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);