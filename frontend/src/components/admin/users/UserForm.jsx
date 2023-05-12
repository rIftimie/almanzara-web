import { useForm } from 'react-hook-form';
import { createUser } from 'src/helpers/fetch';

import './UserForm.css';

const UserForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	async function handleCreateUser(user) {
		const response = await createUser(user);
	}

	function onSubmit(data) {
		handleCreateUser(data);
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
			<label htmlFor="password" className="flex flex-col">
				<span> CONTRASEÑA</span>
				<input
					className="px-2 py-1"
					type="password"
					{...register('password', { required: true })}
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

			{/* errors will return when field validation fails  */}
			{errors.exampleRequired && <span>This field is required</span>}

			<input
				type="submit"
				value="CREAR USUARIO"
				className="px-2 py-1 text-white rounded cursor-pointer hover:bg-testPrimary-100/70 bg-testPrimary-100 w-fit"
			/>
		</form>
	);
};

export default UserForm;
