import { formatDate } from 'src/helpers/reports';
import { selectAllUsers, getSelectedUsers } from 'src/helpers/users';
import { deleteUsers } from 'src/helpers/fetch';

import './UsersTable.css';
import { Link, NavLink } from 'react-router-dom';

const UsersTable = ({ users }) => {
	let response = 'No se han encontrado usuarios.';
	let renderUsers = [];

	async function handleDeleteUsers() {
		const userIds = getSelectedUsers();
		if (userIds.length > 0) {
			const response = await deleteUsers(userIds);
		} else {
			window.alert('Debes seleccionar al menos un usuario.');
		}
	}

	async function handleCreateUser() {}

	if (users) {
		renderUsers = users.map((user) => (
			<tr
				key={user.id}
				className="border border-testText-100 hover:bg-testBackground-100"
			>
				<td>
					<input
						className="select-user"
						type="checkbox"
						data-id={user.id}
						name="userId"
						id=""
					/>
				</td>
				<td className="py-1">{user.id}</td>
				<td className="py-1">{user.username}</td>
				<td className="py-1">{user.first_name}</td>
				<td className="py-1">{user.last_name}</td>
				<td className="py-1">{formatDate(user.created_at)}</td>
				<td className="py-1">{formatDate(user.updated_at)}</td>
			</tr>
		));
		response = (
			<table id="adminUsersTable" className="w-full text-center">
				<thead className="text-sm text-white border-t border-r border-l border-testText-100 bg-testPrimary-100">
					<tr>
						<th className="p-2">
							<input
								type="checkbox"
								className="main-select-user"
								name=""
								id=""
								onClick={() => selectAllUsers()}
							/>
						</th>
						<th className="p-2">ID</th>
						<th className="p-2">USUARIO</th>
						<th className="p-2">NOMBRE</th>
						<th className="p-2">APELLIDOS</th>
						<th className="p-2">F. DE CREACION</th>
						<th className="p-2">F. DE ULTIMA MODIFICACION</th>
					</tr>
				</thead>
				<tbody>{renderUsers}</tbody>
			</table>
		);
	}

	return (
		<main>
			<header className="flex justify-between items-center p-2">
				<div>
					<button
						onClick={() => handleDeleteUsers()}
						className="px-2 py-1 font-bold border border-testText-100 hover:bg-testPrimary-300"
					>
						<i className="fa-solid fa-trash"></i> Eliminar
					</button>
				</div>
				<div>
					<Link to="new">
						<i className="fa-solid fa-plus"></i> Crear
					</Link>
				</div>
			</header>
			{response}
		</main>
	);
};

export default UsersTable;
