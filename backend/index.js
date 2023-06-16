import express from 'express';
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

// Reports
app.use('/api/reports', reportsRouter);
app.use('/api/report', reportRouter);

// Users
app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);

// Authentication
app.use('/api/auth', authRouter);

// Set port, listen for requests
const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
