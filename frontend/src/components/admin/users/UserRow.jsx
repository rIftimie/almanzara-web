import React from 'react';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatDate } from 'src/helpers';
import { deleteUser } from 'src/helpers/api/users';

const UserRow = ({ user, useStateUsers }) => {
	const navigate = useNavigate();

	const [users, setUsers] = useStateUsers;

	const actionsDropdownRef = useRef(null);

	function handleOnClickRow(id) {
		return navigate('/admin/user/' + id);
	}

	function handleOnClickActions() {
		if (actionsDropdownRef.current.style.visibility == 'visible') {
			actionsDropdownRef.current.style.visibility = 'hidden';
		} else {
			const dropdowns = document.querySelectorAll('.actionsDropdown');
			for (let i = 0; i < dropdowns.length; i++) {
				const element = dropdowns[i];
				if (element.style.visibility == 'visible') {
					element.style.visibility = 'hidden';
				}
			}
			actionsDropdownRef.current.style.visibility = 'visible';
		}
	}

	async function handleDeleteUser(userId) {
		const response = await deleteUser(userId);
		if (response.ok) {
			setUsers({
				...users,
				results: users.results.filter((user) => user.id != userId),
			});
		}
	}

	return (
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
			<td>
				<div
					onClick={() => {
						handleOnClickActions();
					}}
					className="relative"
				>
					<i className="p-1 px-2 text-base rounded-full cursor-pointer fa-sharp fa-solid fa-gear hover:bg-testBackground-200"></i>
					<div
						ref={actionsDropdownRef}
						className={
							'flex absolute top-8 right-8 invisible z-10 flex-col font-bold bg-white shadow-lg text-start shadow-gray-500/50 actionsDropdown'
						}
					>
						<NavLink
							to={'/admin/user/' + user.id}
							className="p-2 w-full rounded-t hover:bg-testBackground-100"
						>
							Mostrar
						</NavLink>
						<NavLink
							to={'/admin/user/' + user.id + '/update'}
							className="p-2 w-full rounded-t hover:bg-testBackground-100"
						>
							Actualizar
						</NavLink>
						<NavLink
							onClick={() => handleDeleteUser(user.id)}
							className="p-2 w-full rounded-t hover:bg-testBackground-100"
						>
							Borrar
						</NavLink>
					</div>
				</div>
			</td>
		</tr>
	);
};

export default UserRow;
