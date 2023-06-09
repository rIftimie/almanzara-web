import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
	authRouter,
	reportRouter,
	reportsRouter,
	userRouter,
	usersRouter,
} from './routes/index.js';

// Initialize Express and dependencies
const app = express();
app.use(bodyParser.json());

// Variables
const PORT = process.env.PORT || 3000;

// var corsOptions = {
// 	origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080',
// };

// app.use(cors(corsOptions));

// Build Static Web Application:
app.use('/', express.static('../frontend/dist'));

// Report
app.use('/api/reports', reportsRouter);
app.use('/api/report', reportRouter);

// User
app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);

// Authentication
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
