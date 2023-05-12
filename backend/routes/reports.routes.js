const { getAllReports } = require('../../frontend/src/helpers/fetch');

const router = require('express').Router();

router.get('/', getAllReports);

module.exports = router;
