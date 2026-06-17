const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const { items, subTotal, tax, discount, totalPayment } = req.body;
    console.log('New Transaction:', req.body);

    const transaction = new Transaction({ items, subTotal, tax, discount, totalPayment });
    await transaction.save();

    res.status(201).json({ message: 'Transaction saved', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/transactions (optional, useful for checking saved data)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;