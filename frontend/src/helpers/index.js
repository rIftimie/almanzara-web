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
