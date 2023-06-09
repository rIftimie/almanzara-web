export async function getReportsFromUser(res, connection, user) {
	let query =
		'SELECT * FROM weighings WHERE user=' +
		user.id +
		' AND deleted_at IS NULL ORDER BY start_date DESC';

	if (user.roles.includes('ROLE_ADMIN')) {
		query =
			'SELECT * FROM weighings WHERE deleted_at IS NULL ORDER BY start_date DESC';
	}
	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		if (results) {
			res.json(results);
		} else {
			res.sendStatus(404);
		}
	});
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
