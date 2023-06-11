export async function getReports(
	res,
	connection,
	user,
	pagination = {
		page: 0,
		size: 0,
	},
	filters = {
		date_from: null,
		date_to: null,
		duration_from: null,
		duration_to: null,
		total_gr_from: null,
		total_gr_to: null,
		olive_type: null,
	}
) {
	const admin = user.roles.includes('ROLE_ADMIN');

	const pageNumber = pagination.page || 1; // Get the current page number from the query parameters
	const pageSize = pagination.size || 10; // Number of items per page

	let getQuery = `SELECT w.*, u.username, u.first_name, u.last_name FROM weighings w 
	LEFT JOIN users u ON u.id = w.user WHERE user=${user.id} AND w.deleted_at IS NULL`;

	if (admin) {
		getQuery = `SELECT w.*, u.username, u.first_name, u.last_name FROM weighings w 
		LEFT JOIN users u ON u.id = w.user WHERE w.deleted_at IS NULL`;
	}

	let filter = false;

	if (filters.username != null) {
		filter = true;
		getQuery += ` AND u.username = "${filters.username}"`;
	}

	if (filters.date_from != null && filters.date_to != null) {
		filter = true;
		getQuery += ` AND w.start_date >= "${filters.date_from}" AND w.start_date <= "${filters.date_to}"`;
	} else if (filters.date_from != null) {
		filter = true;
		getQuery += ` AND w.start_date >= "${filters.date_from}"`;
	} else if (filters.date_to != null) {
		filter = true;
		getQuery += ` AND w.start_date <= "${filters.date_to}" `;
	}

	if (filters.duration_from != null && filters.duration_to != null) {
		filter = true;
		getQuery += ` AND w.duration >= "${filters.duration_from}" AND w.duration <= "${filters.duration_to}"`;
	} else if (filters.duration_from != null) {
		filter = true;
		getQuery += ` AND w.duration >= "${filters.duration_from}"`;
	} else if (filters.duration_to != null) {
		filter = true;
		getQuery += ` AND w.duration <= "${filters.duration_to}"`;
	}

	if (filters.total_gr_from != null && filters.total_gr_to != null) {
		filter = true;
		getQuery += ` AND w.total_gr >= "${filters.total_gr_from}" AND w.total_gr <= "${filters.total_gr_to}"`;
	} else if (filters.total_gr_from != null) {
		filter = true;
		getQuery += ` AND w.total_gr >= "${filters.total_gr_from}"`;
	} else if (filters.total_gr_to != null) {
		filter = true;
		getQuery += ` AND w.total_gr <= "${filters.total_gr_to}"`;
	}

	if (filters.olive_type != null) {
		filter = true;
		getQuery += ` AND w.olive_type = "${filters.olive_type}"`;
	}

	getQuery += ' ORDER BY w.start_date DESC';

	if (!filter) {
		if (pageNumber > 1) {
			getQuery += ` LIMIT ${(pageNumber - 1) * pageSize}, ${pageSize}`;
		} else {
			getQuery += ` LIMIT 0, ${pageSize}`;
		}
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
export async function getReportsByYear(
	res,
	connection,
	user,
	firstYear,
	secondYear
) {
	let query = `SELECT * FROM weighings WHERE YEAR(start_date) IN (${firstYear}) AND user=${user.id};`;
	query += `SELECT * FROM weighings WHERE YEAR(start_date) IN (${secondYear}) AND user=${user.id}`;

	connection.query(query, async function (error, reportsResults, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		res.json({
			firstYear: { year: firstYear, results: reportsResults[0] },
			secondYear: { year: secondYear, results: reportsResults[1] },
		});
	});
}

export async function createReport(res, connection, report) {
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
}

export async function updateReport(res, connection, report) {
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
