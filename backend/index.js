import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import mysql from 'mysql';
import { logIn } from './controllers/AuthController.js';
import {
	createReport,
	deleteReports,
	findReportById,
	getReportsFromUser,
	updateReport,
} from './controllers/ReportsController.js';
import {
	createUser,
	deleteUsers,
	findUserById,
	getAllUsers,
	updateUser,
} from './controllers/UserController.js';

// Initialize Express and dependencies
const app = express();
dotenv.config();
app.use(bodyParser.json());

// Variables
const PORT = process.env.PORT || 3000;

// var corsOptions = {
// 	origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080',
// };

// app.use(cors(corsOptions));

// Build Static Web Application:
app.use('/', express.static('../frontend/dist'));

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.RDS_HOST,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	database: process.env.RDS_DATABASE,
	port: process.env.RDS_PORT,
});

// POST: Log in User
app.post('/api/auth', async (req, res) => {
	const { username, password } = req.body;

	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		logIn(connection, username, password, res);
	});
});

// POST: Reports from the user
app.post('/api/reports', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		getReportsFromUser(res, connection, req.body);
	});
});

// DELETE: Reports[]
app.delete('/api/reports', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		deleteReports(res, connection, req.body);
	});
});

// GET: Report
app.get('/api/report/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		findReportById(res, connection, req.params.id);
	});
});

// PUT: Report
app.put('/api/report/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		updateReport(res, connection, req.body);
	});
});

// PUT: Report{}
app.put('/api/reports', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		createReport(res, connection, req.body);
	});
});

// GET: All Users from database
app.get('/api/users', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		getAllUsers(res, connection);
	});
});

// GET: User{}
app.get('/api/user/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		findUserById(res, connection, req.params.id);
	});
});

// PUT: User{}
app.put('/api/user/:id', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		updateUser(res, connection, req.body);
	});
});

// DELETE: Users[]
app.delete('/api/users', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		deleteUsers(res, connection, req.body);
	});
});

// PUT: User{}
app.put('/api/users', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		createUser(res, connection, req.body);
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
