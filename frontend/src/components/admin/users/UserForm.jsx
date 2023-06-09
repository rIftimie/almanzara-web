import { useForm } from 'react-hook-form';
import { createUser, updateUser } from 'src/helpers/api/users';
import { useParams, useLoaderData } from 'react-router-dom';

import './UserForm.css';
import { useEffect } from 'react';

const UserForm = () => {
	const { id } = useParams();
	const user = useLoaderData();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	async function handleSubmitUser(data) {
		if (user) {
			data.id = id;
			const response = await updateUser(data);
			if (response.ok) {
				window.alert('Usuario actualizado');
			}
		} else {
			const response = await createUser(data);
			if (response.ok) {
				window.alert('Usuario creado');
				reset();
			}
		}
	}

	async function handleLoadUser() {
		setValue('username', user.username);
		setValue('first_name', user.first_name);
		setValue('last_name', user.last_name);
		setValue('email', user.email);
		setValue('olive_type', user.olive_type);
		setValue('password', user.password);
		setValue('admin', user.roles.includes('ROLE_ADMIN'));
	}

	useEffect(() => {
		if (user) {
			handleLoadUser();
		}
	}, []);

	function onSubmit(data) {
		handleSubmitUser(data);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			id="userForm"
			className="flex flex-col p-3 space-y-2 lg:m-auto lg:mt-4 lg:w-1/3 bg-testPrimary-200"
		>
			<label htmlFor="username" className="flex flex-col">
				<span> USUARIO</span>
				<input
					className="px-2 py-1"
					{...register('username', { required: true })}
				/>
			</label>
			<label htmlFor="first_name" className="flex flex-col">
				<span> NOMBRE </span>
				<input
					className="px-2 py-1"
					{...register('first_name', { required: true })}
				/>
			</label>
			<label htmlFor="last_name" className="flex flex-col">
				<span> APELLIDOS </span>
				<input
					className="px-2 py-1"
					{...register('last_name', { required: true })}
				/>
			</label>
			<label htmlFor="email" className="flex flex-col">
				<span> CORREO ELECTRONICO </span>
				<input
					className="px-2 py-1"
					{...register('email', { required: true })}
				/>
			</label>
			<label htmlFor="email" className="flex">
				<span className="mr-2"> ADMIN </span>
				<input type="checkbox" {...register('admin')} />
			</label>
			<label htmlFor="password" className="flex flex-col">
				<span> CONTRASEÑA</span>
				<input
					className="px-2 py-1"
					type="password"
					{...register('password', { required: true })}
				/>
			</label>

			{/* errors will return when field validation fails  */}
			{errors.exampleRequired && <span>This field is required</span>}

			<input
				type="submit"
				value={user ? 'Actualizar' : ' Crear'}
				className="px-2 py-1 text-white rounded cursor-pointer hover:bg-testPrimary-100/70 bg-testPrimary-100 w-fit"
			/>
		</form>
	);
};

export default UserForm;
