import { useEffect, useState } from 'react';
import UsersTable from 'src/components/admin/users/UsersTable';
import { getAllUsers } from 'src/helpers/api/users/';
import Pagination from 'src/components/reports/Pagination';
import { useUserContext } from 'src/context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const UserContainer = () => {
	const { user } = useUserContext();
	const navigate = useNavigate();

	const [users, setUsers] = useState({ count: 0, results: null });

	// Pagination
	const search = useLocation().search;
	const pageNumber = Number(new URLSearchParams(search).get('page')) || 1;
	const pageSize = Number(new URLSearchParams(search).get('size')) || 5;

	let loading = true;

	if (users.results) {
		loading = false;
	}

	async function handleLoadUsers() {
		const response = await getAllUsers({
			user,
			pagination: { page: pageNumber, size: pageSize },
		});
		setUsers(response);
	}

	useEffect(() => {
		// Check if user is logged in
		if (!user || !user.roles.includes('ROLE_ADMIN')) {
			navigate('/login');
		} else {
			handleLoadUsers();
		}
	}, [pageNumber]);

	return (
		<main className="flex flex-col grow">
			{loading ? (
				'Cargando usuarios...'
			) : (
				<>
					<section className="p-4">
						<Pagination
							count={users.count}
							pageSize={pageSize}
							pageNumber={pageNumber}
						/>
						<UsersTable handleUsers={[users, setUsers]} />
					</section>
				</>
			)}{' '}
		</main>
	);
};

export default UserContainer;
