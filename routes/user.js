const express = require('express');
const users = require('../controllers/user');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.get('/', authenticate, [users.getAll]);
router.get('/:id', authenticate, [users.fetchByID]);
router.put('/:id', authenticate, [users.UpdateByID]);

router.delete('/:id', authenticate, [users.deleteUser]);
// router.post('/upload', authenticate, [users.upload1]);

router.post('/insert/address', [users.InsertAddress]);

module.exports = router;