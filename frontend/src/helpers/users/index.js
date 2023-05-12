export function selectAllUsers() {
	const mainInput = document.getElementsByClassName('main-select-user')[0];
	const allInputs = document.getElementsByClassName('select-user');
	for (let i = 0; i < allInputs.length; i++) {
		allInputs[i].checked = mainInput.checked;
	}
}
export function getSelectedUsers() {
	const allInputs = document.getElementsByClassName('select-user');
	const userIds = [];

	for (let i = 0; i < allInputs.length; i++) {
		allInputs[i].checked
			? userIds.push(allInputs[i].getAttribute('data-id'))
			: false;
	}

	return userIds;
}
