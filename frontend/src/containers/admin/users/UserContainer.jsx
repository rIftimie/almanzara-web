import { useEffect, useState } from 'react';
import UsersTable from 'src/components/admin/users/UsersTable';
import { getAllUsers } from 'src/helpers/api/users/';

const UserContainer = () => {
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
		<main className="flex flex-col grow">
			{loading ? (
				'Cargando usuarios...'
			) : (
				<UsersTable handleUsers={[users, setUsers]} />
			)}{' '}
		</main>
	);
};

export default UserContainer;
