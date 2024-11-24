const express = require('express');
const customer= require('../controllers/customers/customer');
const { authenticate } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {RequestSchema} = require('../controllers/customers/schema');

const router = express.Router();
router.get('/', authenticate, [customer.fetch]);
router.post('/', authenticate,validateRequest(RequestSchema),customer.post);
router.put('/:id', authenticate, [customer.UpdateByID]);


module.exports = router;