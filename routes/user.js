const express = require('express');
const users = require('../controllers/users/user');
const { authenticate } = require('../middleware/auth');
const validateRequest  = require('../middleware/validateRequest');
const {RequestSchema} = require('../controllers/users/schema');


const router = express.Router();

router.get('/', authenticate, [users.getAll]);
router.post('/', authenticate,validateRequest(RequestSchema), [users.addLabour]);
router.post('/demo', authenticate, [users.addLabour]);

router.get('/:id', authenticate, [users.fetchByID]);
router.put('/:id', authenticate, [users.UpdateByID]);

router.delete('/:id', authenticate, [users.deleteUser]);
// router.post('/upload', authenticate, [users.upload1]);

router.post('/insert/address', [users.InsertAddress]);

module.exports = router;