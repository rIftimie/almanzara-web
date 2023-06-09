import { formatDate } from 'src/helpers/';
import { deleteUser } from 'src/helpers/api/users';
import { useNavigate } from 'react-router-dom';

import './UsersTable.css';
import { Link, NavLink } from 'react-router-dom';

const UsersTable = ({ handleUsers }) => {
	let response = 'No se han encontrado usuarios.';
	let renderUsers = [];

	const [users, setUsers] = handleUsers;

	const navigate = useNavigate();

	async function handledeleteUser() {
		// const response = await deleteUser(userIds);
	}

	function handleOnClickRow(id) {
		return navigate('/admin/user/' + id);
	}

	if (users) {
		renderUsers = users.map((user) => (
			<tr key={user.id} className="border border-testText-100">
				<td onClick={() => handleOnClickRow(user.id)} className="py-1">
					{user.id}
				</td>
				<td onClick={() => handleOnClickRow(user.id)} className="py-1">
					{user.username}
				</td>
				<td onClick={() => handleOnClickRow(user.id)} className="py-1">
					{user.first_name + ' ' + user.last_name}
				</td>
				<td onClick={() => handleOnClickRow(user.id)} className="py-1">
					{user.email}
				</td>
				<td onClick={() => handleOnClickRow(user.id)} className="py-1">
					{formatDate(user.created_at)}
				</td>
				<td onClick={() => handleOnClickRow(user.id)} className="py-1">
					{formatDate(user.updated_at)}
				</td>
				<td className="py-1">
					<i
						onClick={() => console.log('actions')}
						className="p-1.5 rounded-full cursor-pointer fa-sharp fa-solid fa-gear hover:bg-testBackground-200"
					></i>
				</td>
			</tr>
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
			<header className="flex justify-between items-center p-2">
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
