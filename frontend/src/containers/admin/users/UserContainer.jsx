import { useEffect, useState } from 'react';
import UsersTable from 'src/components/admin/users/UsersTable';
import { getAllUsers } from 'src/helpers/api/users/';
import Pagination from 'src/components/reports/Pagination';
import { useUserContext } from 'src/context/UserContext';
import { useLocation } from 'react-router-dom';

const UserContainer = () => {
	const { user } = useUserContext();

	const [users, setUsers] = useState({ count: 0, results: null });

	// Pagination
	const search = useLocation().search;
	const pageNumber = Number(new URLSearchParams(search).get('page')) || 1;
	const pageSize = Number(new URLSearchParams(search).get('size')) || 5;

	let loading = true;

	if (users.results) {
		loading = false;
	}

	useEffect(() => {
		async function handleLoadUsers() {
			const response = await getAllUsers({
				user,
				pagination: { page: pageNumber, size: pageSize },
			});
			setUsers(response);
		}

		handleLoadUsers();
	}, [pageNumber]);

	return (
		<main className="flex flex-col grow">
			{loading ? (
				'Cargando usuarios...'
			) : (
				<>
					<Pagination
						count={users.count}
						pageSize={pageSize}
						pageNumber={pageNumber}
					/>
					<UsersTable handleUsers={[users, setUsers]} />
				</>
			)}{' '}
		</main>
	);
};

export default UserContainer;
