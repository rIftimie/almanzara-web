import bcrypt from 'bcrypt';

export async function getAllUsers(res, connection, user, pagination) {
	const admin = user.roles.includes('ROLE_ADMIN');

	const pageNumber = pagination.page || 1; // Get the current page number from the query parameters
	const pageSize = pagination.size || 10; // Number of items per page

	let getQuery = 'SELECT * FROM users WHERE deleted_at IS NULL';

	if (pageNumber > 1) {
		getQuery += ` LIMIT ${(pageNumber - 1) * pageSize}, ${pageSize}`;
	} else {
		getQuery += ` LIMIT 0, ${pageSize}`;
	}
	if (!admin) {
		res.sendStatus(403);
	} else {
		connection.query(getQuery, function (error, usersResults, fields) {
			let countQuery = 'SELECT count(*) FROM users WHERE deleted_at IS NULL';

			if (usersResults) {
				// Count total number of reports
				connection.query(countQuery, function (error, usersCount, fields) {
					connection.release();

					// Handle error after the release.
					if (error) throw error;

					const pageCount = usersCount[0]['count(*)'];

					res.json({ count: pageCount, results: usersResults });
				});
			} else {
				connection.release();

				// Handle error after the release.
				if (error) throw error;

				res.sendStatus(404);
			}
		});
	}
}

export async function createUser(res, connection, user) {
	// bcrypt.hash(user.password, 10, function (err, hash) {
	// Create hashed password and query
	let roles = 'ROLE_USER';
	if (user.admin) {
		roles = roles + ',ROLE_ADMIN';
	}
	const query = `INSERT INTO users (username, password, first_name, last_name, email, roles, created_at, updated_at) VALUES 
		("${user.username}","${user.password}" ,"${user.first_name}","${user.last_name}","${user.email}", "${roles}" ,NOW(),NOW())`;

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

export async function updateUser(res, connection, user) {
	// bcrypt.hash(user.password, 10, function (err, hash) {
	// Create hashed password and query
	let roles = 'ROLE_USER';
	if (user.admin) {
		roles = roles + ',ROLE_ADMIN';
	}
	const query = `UPDATE users 
	SET username = "${user.username}",
		password = "${user.password}",
		first_name = "${user.first_name}",
		last_name = "${user.last_name}",
		email = "${user.email}",
		roles = "${roles}",
		updated_at = NOW() WHERE id = ${user.id}`;

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

export async function findUserById(res, connection, userId) {
	const query = 'SELECT * FROM users WHERE id = ' + userId;

	// Use the connection
	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		res.json(results[0]);
	});
}

export async function deleteUser(res, connection, userId) {
	const query = `UPDATE users SET deleted_at = NOW() WHERE id = ${userId}`;

	// Use the connections
	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		res.sendStatus(200);
	});
}
