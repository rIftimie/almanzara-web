export function formatDate(date) {
	const year = date.split('T')[0].split('-')[0];
	const month = date.split('T')[0].split('-')[1];
	const day = date.split('T')[0].split('-')[2];
	const hours = date.split('T')[1].split('.')[0].slice(0, -3);

	const formattedDate = day + '-' + month + '-' + year + ' ' + hours;

	return formattedDate;
}

export function formatTime(time) {
	let hours = time.split(':')[0];
	if (Number(hours) == 0) {
		hours = '';
	} else {
		hours = hours + 'h';
	}
	let mins = time.split(':')[1];

	return hours + mins + 'm';
}
