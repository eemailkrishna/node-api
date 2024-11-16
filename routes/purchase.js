const express = require('express');
const purchase= require('../controllers/purchases/purchase');
const { authenticate } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {RequestSchema} = require('../controllers/purchases/schema');

const router = express.Router();
router.get('/', authenticate, [purchase.fetch]);
router.post('/', authenticate,validateRequest(RequestSchema),purchase.post);

module.exports = router;