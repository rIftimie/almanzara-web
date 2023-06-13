import { NavLink, useLoaderData } from 'react-router-dom';
import { formatDate } from 'src/helpers/';

import './User.css';

const User = () => {
	const user = useLoaderData();

	return (
		<>
			{
				<main id="userContainer" className="flex grow">
					<section className="flex flex-col p-3 pb-5 m-auto my-3 space-y-2 w-9/12 text-white lg:w-1/2 min-h-fit h-fit bg-testPrimary-100">
						<header>
							{user.first_name} {user.last_name}
							<hr />
						</header>

						<section>
							<span className="text-testPrimary-300">USUARIO</span>
							<div className="px-2 py-1 ml-2 w-1/2 border border-testText-100 bg-testBackground-100 text-testText-100">
								{user.username}
							</div>
						</section>
						<section>
							<span className="text-testPrimary-300">EMAIL</span>
							<div className="px-2 py-1 ml-2 w-1/2 border border-testText-100 bg-testBackground-100 text-testText-100">
								{user.email}
							</div>
						</section>
						<section className="flex flex-wrap">
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">NOMBRE</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{user.first_name}
								</div>
							</div>
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">APELLIDOS</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{user.last_name}
								</div>
							</div>
						</section>
						<section className="flex flex-wrap">
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">FECHA DE CREACION</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{formatDate(user.created_at)}
								</div>
							</div>
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">
									FECHA DE ULTIMA ACTUALIZACION
								</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{formatDate(user.updated_at)}
								</div>
							</div>
						</section>
						<section className="flex justify-end">
							<NavLink
								className="p-1 font-bold text-black bg-white"
								to="update"
							>
								ACTUALIZAR
							</NavLink>
						</section>
					</section>
				</main>
			}
		</>
	);
};

export default User;
