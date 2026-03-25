/**
 * Payment Routes
 * Mounts Cashfree payment order endpoints.
 */

const express = require('express');
const router = express.Router();

const { validatePaymentOrder } = require('../middleware/validate.middleware');
const { createOrder } = require('../controllers/payment.controller');

// POST /api/create-order — Create a Cashfree payment order
router.post('/create-order', validatePaymentOrder, createOrder);

module.exports = router;
