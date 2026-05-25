const DayFood = require('../models/DayFood');

exports.getDayFoods = async (req, res) => {
  try {
    const dayFoods = await DayFood.find({});
    res.status(200).json(dayFoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDayFood = async (req, res) => {
  try {
    const newDayFood = new DayFood(req.body);
    const saved = await newDayFood.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDayFood = async (req, res) => {
  try {
    const item = await DayFood.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item assignment not found" });
    res.status(200).json({ message: "Item decoupled from menu layout" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};