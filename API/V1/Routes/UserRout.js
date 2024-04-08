const router = require('express').Router();

const {
    Register,
    Login
}= require('../Controllers/UserController');

router.post('/register',Register);
router.post('/login',Login);

module.exports = router;