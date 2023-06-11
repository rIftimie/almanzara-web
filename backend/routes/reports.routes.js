import {
	getReports,
	deleteReports,
	getReportsByYear,
} from '../controllers/ReportsController.js';

import { pool } from '../database/index.js';

import express from 'express';

const router = express.Router();

// POST: Reports from the user
router.post('/', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		getReports(
			res,
			connection,
			req.body.user,
			req.body.pagination,
			req.body.filters
		);
	});
});
// POST: Reports from the user
router.post('/compare', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		getReportsByYear(
			res,
			connection,
			req.body.user,
			req.body.firstYear,
			req.body.secondYear
		);
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
