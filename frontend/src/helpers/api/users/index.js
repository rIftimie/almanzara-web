const endPoint = import.meta.env.VITE_API_URL;

export async function getAllUsers(data) {
	const url = endPoint + '/api/users';

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error(500);

	return response.json();
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

		return response;
	} catch (error) {
		throw new Error(error);
	}
}

export async function updateUser(user) {
	try {
		const url = endPoint + '/api/user/' + user.id;

		const response = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(user),
		});
		if (!response.ok) throw new Error(500);

		return response;
	} catch (error) {
		throw new Error(error);
	}
}

export async function deleteUser(userId) {
	try {
		const url = endPoint + '/api/user/' + userId;
		const response = await fetch(url, {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json' },
		});
		if (!response.ok) throw new Error(500);

		return response;
	} catch (error) {
		throw new Error(error);
	}
}

export async function findUserById(userId) {
	try {
		const url = endPoint + '/api/user/' + userId;

		const response = await fetch(url, {
			headers: { 'Content-type': 'application/json' },
		});

		if (!response.ok) throw new Error(500);

		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
}
