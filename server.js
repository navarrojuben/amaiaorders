const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ================= MIDDLEWARE =================
// Configure CORS to allow your Netlify frontend and local development
app.use(cors({
  origin: ["https://amaiaorders.netlify.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ================= MONGODB CONNECTION =================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    console.log('Connected to MongoDB Successfully! 🎉');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // We don't necessarily exit here to allow Railway to keep retrying if it's a transient issue
  }
};

connectDB();

// ================= ROUTES =================
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/dayfoods', require('./routes/foodRoutes'));
app.use('/api/day-foods', require('./routes/dayFoodRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// ================= HEALTH CHECK & START =================
app.get('/', (req, res) => res.json({ message: 'POS Backend API running 🚀' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`POS Server running smoothly on port ${PORT}`));