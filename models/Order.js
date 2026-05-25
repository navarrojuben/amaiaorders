const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: { type: String, required: true },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  foodName: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  qty: { type: Number, required: true, min: 1 },
  total: { type: Number, required: true },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);