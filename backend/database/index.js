import mysql from 'mysql';

import * as dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	multipleStatements: true,
});
