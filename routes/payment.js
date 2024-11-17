const express = require('express');
const payment= require('../controllers/payments/payment');
const { authenticate } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {RequestSchema} = require('../controllers/payments/schema');

const router = express.Router();
router.get('/', authenticate, [payment.fetch]);
router.post('/', authenticate,validateRequest(RequestSchema),payment.post);
router.post('/additional-cost', authenticate,payment.additionalCost);
router.get('/additional-cost', authenticate,payment.additionalCostFetch);
router.post('/additional-expense', authenticate,payment.addtionalExpense);
router.get('/additional-expense', authenticate,payment.addtionalExpenseFetch);
router.get('/diesel-expense', authenticate,payment.dieselFetch);
router.post('/diesel-expense', authenticate,payment.dieselPost);







module.exports = router;