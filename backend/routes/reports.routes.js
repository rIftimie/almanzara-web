import {
	getReportsFromUser,
	deleteReports,
} from '../controllers/ReportsController.js';

import { pool } from '../database/index.js';

import express from 'express';

const router = express.Router();

// POST: Reports from the user
router.post('/', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		getReportsFromUser(res, connection, req.body);
	});
});

// DELETE: Reports[]
router.delete('/', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		deleteReports(res, connection, req.body);
	});
});

export default router;
