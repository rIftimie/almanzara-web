export async function getReports(res, connection, user, pagination) {
	const admin = user.roles.includes('ROLE_ADMIN');

	const pageNumber = pagination.page || 1; // Get the current page number from the query parameters
	const pageSize = pagination.size || 10; // Number of items per page

	let getQuery = `SELECT * FROM weighings WHERE user=${user.id} AND deleted_at IS NULL ORDER BY start_date DESC`;

	if (admin) {
		getQuery = `SELECT * FROM weighings WHERE deleted_at IS NULL ORDER BY start_date DESC`;
	}

	if (pageNumber > 1) {
		getQuery += ` LIMIT ${(pageNumber - 1) * pageSize}, ${pageSize}`;
	} else {
		getQuery += ` LIMIT 0, ${pageSize}`;
	}

	connection.query(getQuery, async function (error, reportsResults, fields) {
		// When done with the connection, release it.

		let countQuery = 'SELECT count(*) FROM weighings WHERE deleted_at IS NULL';
		if (!admin) {
			countQuery += ` AND user=${user.id}`;
		}

		if (reportsResults) {
			// Count total number of reports
			connection.query(countQuery, function (error, reportsCount, fields) {
				connection.release();

				// Handle error after the release.
				if (error) throw error;

				const pageCount = reportsCount[0]['count(*)'];

				res.json({ count: pageCount, results: reportsResults });
			});
		} else {
			connection.release();

			// Handle error after the release.
			if (error) throw error;

			res.sendStatus(404);
		}
	});
}

async function getReportsCount(connection, userId, admin) {
	// });
}

export async function createReport(res, connection, report) {
	// bcrypt.hash(user.password, 10, function (err, hash) {
	// Create hashed password and query
	const query = `INSERT INTO weighings(user, start_date, duration, total_gr, olive_type)
	VALUES (${report.user},"${report.start_date}" ,"${report.duration}",${report.total_gr},"${report.olive_type}")`;

	// Use the connection
	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		res.sendStatus(201);
	});
	// });
}
export async function updateReport(res, connection, report) {
	// bcrypt.hash(user.password, 10, function (err, hash) {
	// Create hashed password and query
	const query = `UPDATE weighings
	SET start_date = "${report.start_date}", duration = "${report.duration}", total_gr = ${report.total_gr}, olive_type = "${report.olive_type}" WHERE id = ${report.id}`;

	// Use the connection
	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		res.sendStatus(200);
	});
	// });
}

export async function deleteReports(res, connection, reportsIds) {
	const query =
		'UPDATE weighings SET deleted_at = NOW() WHERE id IN (' +
		reportsIds.toString() +
		')';

	// Use the connection
	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		res.json(results);
	});
}

export async function findReportById(res, connection, reportId) {
	const reportQuery =
		'SELECT * FROM weighings WHERE id = ' +
		reportId +
		' AND deleted_at IS NULL';

	// Use the connection
	connection.query(reportQuery, function (error, reportResults, fields) {
		if (reportResults[0]) {
			const userQuery =
				'SELECT * FROM users WHERE id = ' + reportResults[0].user;

			connection.query(userQuery, function (error, userResults, fields) {
				// When done with the connection, release it.
				connection.release();

				// Handle error after the release.
				if (error) throw error;

				reportResults[0].user = userResults[0];

				res.json(reportResults[0]);
			});
		} else {
			connection.release();

			res.sendStatus(404);
		}
	});
}
