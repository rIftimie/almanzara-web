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

export async function createUser(res, connection, user) {
	bcrypt.hash(user.password, 10, function (err, hash) {
		// Create hashed password and query
		const query = `INSERT INTO users (username, password, first_name, last_name, email, created_at, updated_at) VALUES 
		("${user.username}","${hash}" ,"${user.first_name}","${user.last_name}","${user.email}",NOW(),NOW())`;

		// Use the connection
		connection.query(query, function (error, results, fields) {
			// When done with the connection, release it.
			connection.release();

			// Handle error after the release.
			if (error) throw error;

			res.json(results);
		});
	});
}
