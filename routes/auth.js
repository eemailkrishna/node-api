const express = require('express');
const  userlogin = require('../controllers/auth');
const router = express.Router();

router.post('/login', [userlogin.login]);
router.post('/register', [userlogin.register]);


module.exports = router;