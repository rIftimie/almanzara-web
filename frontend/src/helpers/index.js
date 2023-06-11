export function formatDate(date) {
	const dateConversion = new Date(date);

	let day = checkSyntax(dateConversion.getDate());
	let month = checkSyntax(dateConversion.getMonth() + 1);
	let year = dateConversion.getFullYear();

	let hours = checkSyntax(dateConversion.getHours());
	let minutes = checkSyntax(dateConversion.getMinutes());
	let seconds = checkSyntax(dateConversion.getSeconds());

	const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

	return formattedDate;
}

export function convertToLocal(date) {
	const dateConversion = new Date(date);

	let day = checkSyntax(dateConversion.getDate());
	let month = checkSyntax(dateConversion.getMonth() + 1);
	let year = dateConversion.getFullYear();

	let hours = checkSyntax(dateConversion.getHours());
	let minutes = checkSyntax(dateConversion.getMinutes());
	let seconds = checkSyntax(dateConversion.getSeconds());

	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

	return formattedDate;
}

function checkSyntax(number) {
	if (number < 10) {
		number = '0' + number;
	}
	return number;
}

export function formatTime(time) {
	let hours = time.split(':')[0];
	if (Number(hours) == 0) {
		hours = '';
	} else {
		hours = hours + 'h ';
	}
	let mins = time.split(':')[1];

	return hours + mins + 'm';
}

export function selectAllReports() {
	const mainInput = document.getElementsByClassName('main-select-report')[0];
	const allInputs = document.getElementsByClassName('select-report');
	for (let i = 0; i < allInputs.length; i++) {
		allInputs[i].checked = mainInput.checked;
	}
}
export function getSelectedReports() {
	const allInputs = document.getElementsByClassName('select-report');
	const reportIds = [];

	for (let i = 0; i < allInputs.length; i++) {
		allInputs[i].checked
			? reportIds.push(allInputs[i].getAttribute('data-id'))
			: false;
	}

	return reportIds;
}

export function defaultPagination(search) {
	const pageNumber = Number(new URLSearchParams(search).get('page')) || 1;
	const pageSize = Number(new URLSearchParams(search).get('size')) || 10;

	return {
		pageNumber,
		pageSize,
	};
}

export function getURLParamsFilters(params) {
	const filters = {};
	filters.date_from =
		params.get('date_from') == '' ? null : params.get('date_from'); // is the string "Jonathan"
	filters.date_to = params.get('date_to') == '' ? null : params.get('date_to'); // is the string "Jonathan"
	filters.duration_from =
		params.get('duration_from') == '' ? null : params.get('duration_from'); // is the string "Jonathan"
	filters.duration_to =
		params.get('duration_to') == '' ? null : params.get('duration_to'); // is the string "Jonathan"
	filters.total_gr_from =
		params.get('total_gr_from') == '' ? null : params.get('total_gr_from'); // is the string "Jonathan"
	filters.total_gr_to =
		params.get('total_gr_to') == '' ? null : params.get('total_gr_to'); // is the string "Jonathan"
	filters.olive_type =
		params.get('olive_type') == '' ? null : params.get('olive_type'); // is the string "Jonathan"

	return filters;
}
