export async function getReportsFromUser(res, connection, id) {
	connection.query(
		'SELECT * FROM weighings WHERE user=' + id + ' AND deleted_at IS NULL',
		function (error, results, fields) {
			// When done with the connection, release it.
			connection.release();

			// Handle error after the release.
			if (error) throw error;

			if (results) {
				res.json(results);
			} else {
				res.sendStatus(404);
			}
		}
	);
}
