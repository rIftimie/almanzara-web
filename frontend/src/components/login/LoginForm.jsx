import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import { logIn } from 'src/helpers/auth/';
import './LoginForm.css';
const LoginForm = () => {
	const { user, setUser } = useUserContext();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	async function handleLogIn(data) {
		const response = await logIn(data);
		setUser(response[0]);
		return navigate('/reports');
	}

	function onSubmit(formData) {
		handleLogIn(formData);
	}

	useEffect(() => {
		if (user) {
			return navigate('/');
		}
	}, [user]);

	return (
		<form
			id="loginForm"
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col justify-center p-3 m-auto mt-5 space-y-3 sm:rounded bg-testPrimary-200 sm:w-1/3"
		>
			<section>
				{errors.username && (
					<span className="p-0 text-sm text-red-500">
						*Este campo es obligatorio
					</span>
				)}
				<div className="flex items-center">
					<i className="absolute pl-1 text-gray-700 fa-solid fa-user icon"></i>
					<input
						className="py-2 pl-5 w-full rounded"
						placeholder="Usuario"
						{...register('username', { required: true })}
					/>
				</div>
			</section>
			<section>
				{errors.password && (
					<span className="p-0 text-sm text-red-500">
						*Este campo es obligatorio
					</span>
				)}
				<div className="flex items-center">
					<i className="absolute pl-1 text-gray-700 fa-solid fa-lock"></i>
					<input
						type={'password'}
						className="py-2 pl-5 w-full rounded"
						placeholder="Contraseña"
						{...register('password', { required: true })}
					/>
				</div>
			</section>

			<input
				className="px-2 py-1 m-auto font-bold bg-white rounded-full cursor-pointer hover:bg-white/70 w-fit"
				type="submit"
				value={'Iniciar sesión'}
			/>
		</form>
	);
};

export default LoginForm;
