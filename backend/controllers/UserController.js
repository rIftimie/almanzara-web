import bcrypt from 'bcrypt';

export async function getAllUsers(res, connection) {
	const query = 'SELECT * FROM users WHERE deleted_at IS NULL';

	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		res.json(results);
	});
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

export async function deleteUsers(res, connection, userIds) {
	const query =
		'UPDATE users SET deleted_at = NOW() WHERE id IN (' +
		userIds.toString() +
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
