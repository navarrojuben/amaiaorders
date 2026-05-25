const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dayFoodController');

router.get('/', ctrl.getDayFoods);
router.post('/', ctrl.createDayFood);
router.delete('/:id', ctrl.deleteDayFood);

module.exports = router;