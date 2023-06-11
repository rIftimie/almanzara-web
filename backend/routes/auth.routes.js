import { logIn } from '../controllers/AuthController.js';

import { pool } from '../database/index.js';

import express from 'express';
const router = express.Router();

// POST: Log in User
router.post('/', async (req, res) => {
	const { username, password } = req.body;

	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		logIn(connection, username, password, res);
	});
});

export default router;
