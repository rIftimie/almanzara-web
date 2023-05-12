const { getAllUsers, deleteUsers } = require('../controllers/UserController');

const router = require('express').Router();

router.get('/', getAllUsers);
router.delete('/', deleteUsers);

module.exports = router;
