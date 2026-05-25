const Food = require('../models/Food');

// GET ALL FOODS
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE FOOD ITEM
const createFood = async (req, res) => {
  try {
    const newFood = new Food({
      name: req.body.name,
      price: req.body.price
    });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE FOOD ITEM
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFoods,
  createFood,
  deleteFood
};