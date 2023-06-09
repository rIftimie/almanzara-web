const endPoint = import.meta.env.VITE_API_URL;

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
