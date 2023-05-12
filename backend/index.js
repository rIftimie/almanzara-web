import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import mysql from 'mysql';
import { logIn } from './controllers/AuthController.js';
import { getReportsFromUser } from './controllers/ReportsController.js';
import {
	createUser,
	deleteUsers,
	getAllUsers,
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

// GET: Reports from a user
app.get('/api/reports/:userId', async (req, res) => {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		getReportsFromUser(res, connection, req.params.userId);
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
