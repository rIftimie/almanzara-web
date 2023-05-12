import bcrypt from 'bcrypt';

export async function logIn(connection, username, password, res) {
	// Create Query
	const query = `SELECT id, password, username, first_name, last_name, roles, created_at, updated_at FROM users WHERE username="${username}" AND deleted_at IS NULL`;

	// Use the connection
	connection.query(query, function (error, results, fields) {
		// When done with the connection, release it.
		connection.release();

		// Handle error after the release.
		if (error) throw error;

		if (results.length > 0) {
			bcrypt.compare(password, results[0].password).then(function (result) {
				if (result) {
					// Delete password from sent User Object
					delete results[0].password;
					// Make roles an Array
					if (results[0].roles.length > 1) {
						results[0].roles = results[0].roles.split(',');
					}
					res.json(results);
				} else {
					res.status(403);
				}
			});
		} else {
			res.sendStatus(404);
		}
	});
}
