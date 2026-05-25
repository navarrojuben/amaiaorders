const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Order = require('./models/Order');

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= CUSTOMER ROUTES =================
app.use('/api/customers', require('./routes/customerRoutes'));

// ================= FOOD ROUTES =================
app.use('/api/dayfoods', require('./routes/foodRoutes'));

// ================= DYNAMIC BUSINESS LEDGER ROUTES =================
app.use('/api/day-foods', require('./routes/dayFoodRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));



// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
.then(() => console.log('Connected to MongoDB Successfully! 🎉'))
.catch(err => {
  console.error('MongoDB connection error details:', err.message);
});



/* =========================================================
   HEALTH CHECK & START
   ========================================================= */
app.get('/', (req, res) => res.json({ message: 'POS Backend API running 🚀' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`POS Server running smoothly on port ${PORT}`));