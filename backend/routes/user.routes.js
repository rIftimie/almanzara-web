import {
	createUser,
	deleteUser,
	findUserById,
	updateUser,
} from '../controllers/UserController.js';

import { pool } from '../database/index.js';

import express from 'express';
const router = express.Router();

// PUT: User{}
router.put('/', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		createUser(res, connection, req.body);
	});
});

// GET: User{}
router.get('/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		findUserById(res, connection, req.params.id);
	});
});

// PUT: User{}
router.put('/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		updateUser(res, connection, req.body);
	});
});

// DELETE: User{}
router.delete('/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		deleteUser(res, connection, req.params.id);
	});
});

export default router;
