const { logIn } = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/', logIn());

module.exports = router;
