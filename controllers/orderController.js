const mongoose = require('mongoose');
const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: 1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order already removed or not found" });
    }
    res.status(200).json({ message: "Order removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.togglePaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    order.isPaid = req.body.isPaid;
    const saved = await order.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ================= BULK ACTIONS (FIXED TO PREVENT SCHEMA CASTING CRASHES) =================

exports.bulkTogglePaid = async (req, res) => {
  const { customerId, date, targetPaidState } = req.body;
  
  if (!customerId || !date) {
    return res.status(400).json({ message: "Missing fields: customerId and date are required" });
  }

  try {
    const finalQuery = { date };

    // Strict validation check to keep Mongoose's casting analyzer happy
    if (mongoose.Types.ObjectId.isValid(customerId)) {
      finalQuery.customerId = new mongoose.Types.ObjectId(customerId);
    } else {
      finalQuery.customerId = customerId;
    }

    const result = await Order.updateMany(finalQuery, { $set: { isPaid: targetPaidState } });
    
    res.status(200).json({ 
      message: "Customer account alignment complete", 
      matchedCount: result.matchedCount, 
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    console.error("CRITICAL BULK TOGGLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.bulkDelete = async (req, res) => {
  const { customerId, date } = req.query; 
  
  if (!customerId || !date) {
    return res.status(400).json({ message: "Missing fields: customerId and date query values are required" });
  }

  try {
    const finalQuery = { date };

    // Strict validation check to keep Mongoose's casting analyzer happy
    if (mongoose.Types.ObjectId.isValid(customerId)) {
      finalQuery.customerId = new mongoose.Types.ObjectId(customerId);
    } else {
      finalQuery.customerId = customerId;
    }

    const result = await Order.deleteMany(finalQuery);
    
    res.status(200).json({ 
      message: "Customer line-items completely dropped", 
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error("CRITICAL BULK DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};