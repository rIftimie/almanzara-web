const endPoint = 'http://localhost:3000';

export async function getAllReports(data) {
	const url = endPoint + '/api/reports/' + data.user.id;

	const response = await fetch(url, {
		headers: { 'Content-type': 'application/json' },
	});
	if (!response.ok) throw new Error(500);

	return response.json();
}
export async function getAllUsers() {
	const url = endPoint + '/api/users';

	const response = await fetch(url, {
		headers: { 'Content-type': 'application/json' },
	});
	if (!response.ok) throw new Error(500);

	return await response.json();
}

export async function createUser(user) {
	try {
		const url = endPoint + '/api/users';

		const response = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(user),
		});
		if (!response.ok) throw new Error(500);

		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

export async function logIn(data) {
	try {
		const url = endPoint + '/api/auth/';

		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error(500);

		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

export async function deleteUsers(userIds) {
	try {
		const url = endPoint + '/api/users/';

		const response = await fetch(url, {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(userIds),
		});
		if (!response.ok) throw new Error(500);

		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

export async function getAllReportsFromAWS() {
	try {
		const response = await fetch(
			'https://drebwuza72.execute-api.us-east-1.amazonaws.com/user?id=1',
			{
				headers: {
					'Access-Control-Allow-Origin': '*', // Required for CORS support to work
					'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTP
					'Content-Type': 'application/json',
				},
			}
		);

		const json = await response.json();

		return json;
	} catch (error) {
		throw new Error(error);
	}
}
