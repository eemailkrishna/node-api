const express = require('express');
const land_manage= require('../controllers/land-managements/land-manage');
const { authenticate } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {RequestSchema} = require('../controllers/land-managements/schema');

const router = express.Router();
router.get('/', authenticate, [land_manage.fetch]);
router.post('/', authenticate,validateRequest(RequestSchema),land_manage.post);

module.exports = router;