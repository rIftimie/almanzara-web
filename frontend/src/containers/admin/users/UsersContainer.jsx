import { useEffect, useState } from 'react';
import UsersTable from 'src/components/admin/users/UsersTable';
import { getAllUsers } from 'src/helpers/fetch';

const AdminUsers = () => {
	const [users, setUsers] = useState(null);
	let loading = true;

	if (users) {
		loading = false;
	}

	useEffect(() => {
		async function handleLoadUsers() {
			const response = await getAllUsers();
			setUsers(response);
		}

		handleLoadUsers();
	}, []);

	return (
		<main>
			{loading ? 'Cargando usuarios...' : <UsersTable users={users} />}{' '}
		</main>
	);
};

export default AdminUsers;
