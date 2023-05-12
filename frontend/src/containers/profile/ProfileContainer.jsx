import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import { formatDate } from 'src/helpers/reports';

import './ProfileContainer.css';

const ProfileContainer = () => {
	const { user } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);

	return (
		<>
			{user && (
				<main
					id="profileContainer"
					className="p-3 m-auto my-3 space-y-2 text-white md:w-9/12 lg:w-1/2 bg-testPrimary-100"
				>
					<header>
						Configuración de Cuenta
						<hr />
					</header>

					<section>
						<span className="text-testPrimary-300">USUARIO</span>
						<div className="px-2 py-1 ml-2 w-1/2 border select-none border-testText-100 bg-testBackground-100 text-testText-100">
							{user.username}
						</div>
					</section>
					<section className="flex flex-wrap">
						<div className="w-full sm:w-1/2">
							<span className="text-testPrimary-300">NOMBRE</span>
							<div className="px-2 py-1 ml-2 border select-none border-testText-100 bg-testBackground-100 text-testText-100">
								{user.first_name}
							</div>
						</div>
						<div className="w-full sm:w-1/2">
							<span className="text-testPrimary-300">APELLIDOS</span>
							<div className="px-2 py-1 ml-2 border select-none border-testText-100 bg-testBackground-100 text-testText-100">
								{user.last_name}
							</div>
						</div>
					</section>
					<section className="flex flex-wrap">
						<div className="w-full sm:w-1/2">
							<span className="text-testPrimary-300">FECHA DE CREACION</span>
							<div className="px-2 py-1 ml-2 border select-none border-testText-100 bg-testBackground-100 text-testText-100">
								{formatDate(user.created_at)}
							</div>
						</div>
						<div className="w-full sm:w-1/2">
							<span className="text-testPrimary-300">
								FECHA DE ULTIMA ACTUALIZACION
							</span>
							<div className="px-2 py-1 ml-2 border select-none border-testText-100 bg-testBackground-100 text-testText-100">
								{formatDate(user.updated_at)}
							</div>
						</div>
					</section>
					<section></section>
				</main>
			)}
		</>
	);
};

export default ProfileContainer;
