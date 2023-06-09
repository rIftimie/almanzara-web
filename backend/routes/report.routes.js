import {
	createReport,
	findReportById,
	updateReport,
} from '../controllers/ReportsController.js';

import { pool } from '../database/index.js';

import express from 'express';

const router = express.Router();

// PUT: Report{}
router.put('/', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		createReport(res, connection, req.body);
	});
});

// GET: Report{}
router.get('/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		findReportById(res, connection, req.params.id);
	});
});

// PUT: Report{}
router.put('/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		updateReport(res, connection, req.body);
	});
});

export default router;
