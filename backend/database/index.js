import mysql from 'mysql';

import * as dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.RDS_HOST,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	database: process.env.RDS_DATABASE,
	port: process.env.RDS_PORT,
});
