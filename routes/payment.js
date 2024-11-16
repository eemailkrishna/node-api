const express = require('express');
const payment= require('../controllers/payments/payment');
const { authenticate } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {RequestSchema} = require('../controllers/payments/schema');

const router = express.Router();
router.get('/', authenticate, [payment.fetch]);
router.post('/', authenticate,validateRequest(RequestSchema),payment.post);

module.exports = router;