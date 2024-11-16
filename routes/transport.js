const express = require('express');
const transport= require('../controllers/transport/transport');
const { authenticate } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {transportRequestSchema} = require('../controllers/transport/schema');

const router = express.Router();

router.get('/', authenticate, [transport.fetch]);
router.post('/', authenticate,validateRequest(transportRequestSchema),transport.post);

module.exports = router;