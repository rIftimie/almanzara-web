import { formatDate } from 'src/helpers/';
import { deleteUser } from 'src/helpers/api/users';
import { useNavigate } from 'react-router-dom';

import './UsersTable.css';
import { Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';
import UserRow from './UserRow';

const UsersTable = ({ handleUsers }) => {
	let response = 'No se han encontrado usuarios.';
	let renderUsers = [];

	const [users, setUsers] = handleUsers;

	if (users) {
		renderUsers = users.results.map((user) => (
			<UserRow useStateUsers={[users, setUsers]} key={user.id} user={user} />
		));
		response = (
			<table id="adminUsersTable" className="w-full text-center">
				<thead className="text-sm text-white border-t border-r border-l border-testText-100 bg-testPrimary-100">
					<tr>
						<th className="p-2">ID</th>
						<th className="p-2">USUARIO</th>
						<th className="p-2">NOMBRE</th>
						<th className="p-2">EMAIL</th>
						<th className="p-2">F. DE CREACION</th>
						<th className="p-2">F. DE ULTIMA MODIFICACION</th>
						<th className="p-2">ACCIONES</th>
					</tr>
				</thead>
				<tbody>{renderUsers}</tbody>
			</table>
		);
	}

	return (
		<>
			<header className="flex justify-end items-center p-2">
				<div>
					<Link to="../admin/user/new">
						<i className="fa-solid fa-plus"></i> Crear
					</Link>
				</div>
			</header>
			{response}
		</>
	);
};

export default UsersTable;
