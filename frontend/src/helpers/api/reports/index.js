const endPoint = import.meta.env.VITE_API_URL;

export async function createReport(report) {
	try {
		const url = endPoint + '/api/report';

		const response = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(report),
		});
		if (!response.ok) throw new Error(500);

		return response;
	} catch (error) {
		throw new Error(error);
	}
}
export async function updateReport(report) {
	try {
		const url = endPoint + '/api/report/' + report.id;

		const response = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(report),
		});
		if (!response.ok) throw new Error(500);

		return response;
	} catch (error) {
		throw new Error(error);
	}
}

export async function getReports(data) {
	const url = endPoint + '/api/reports';

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error(500);

	return response.json();
}

export async function getReportsByYear(data) {
	const url = endPoint + '/api/reports/compare';

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error(500);

	return response.json();
}

export async function deleteReports(reportsIds) {
	try {
		const url = endPoint + '/api/reports/';

		const response = await fetch(url, {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(reportsIds),
		});
		if (!response.ok) throw new Error(500);

		return response;
	} catch (error) {
		throw new Error(error);
	}
}

export async function findReportById(reportId) {
	try {
		const url = endPoint + '/api/report/' + reportId;

		const response = await fetch(url, {
			headers: { 'Content-type': 'application/json' },
		});

		if (response.status === 500) {
			throw new Error(500);
		} else if (response.status === 404) {
			throw new Error('404 Not Found');
		} else {
			return await response.json();
		}
	} catch (error) {
		throw new Error(error);
	}
}
