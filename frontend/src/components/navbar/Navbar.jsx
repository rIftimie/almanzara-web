import { NavLink, useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import almanzaraLogo from '../../assets/logo35x35.svg';
import './Navbar.css';
import { useRef } from 'react';

const Navbar = () => {
	const { user } = useUserContext();
	const location = useLocation();
	const dropdownRef = useRef(null);

	return (
		<>
			<nav
				id="mainNavbar"
				className="flex sticky top-0 z-20 flex-col px-6 py-2 sm:items-center sm:justify-between sm:flex-row bg-testBackground-100"
			>
				<div className="flex justify-between items-center">
					<NavLink
						to="/"
						className="flex items-center h-full text-lg whitespace-nowrap font-header"
					>
						<img
							src={almanzaraLogo}
							className="mr-1"
							alt="almanzara-conectada-logo"
						/>
						Almanzara Conectada
					</NavLink>
				</div>
				<ul
					id="navbar-list"
					className="flex flex-col py-2 space-y-1 h-full  sm:!visible sm:flex-row sm:space-x-2 sm:space-y-0 sm:py-0"
				>
					{location.pathname != '/login' && !user ? (
						<li className="pl-1 w-full sm:w-auto">
							<NavLink to="login">Iniciar Sesión</NavLink>
						</li>
					) : null}

					{user && (
						<>
							{user.roles.includes('ROLE_ADMIN') && (
								<li className="flex items-center pl-1 w-full sm:w-auto">
									<NavLink to="admin/users">Panel de Administador</NavLink>
								</li>
							)}

							<li className="flex items-center pl-1 w-full sm:w-auto">
								<NavLink to="reports">Informes</NavLink>
							</li>

							<li
								className="dropdown w-fit"
								onClick={() => {
									if (dropdownRef.current.style.visibility == 'visible') {
										dropdownRef.current.style.visibility = 'hidden';
									} else {
										dropdownRef.current.style.visibility = 'visible';
									}
								}}
							>
								<button className="px-2 py-1 font-bold text-white rounded-full sm:px-3 w-fit hover:bg-testPrimary-200 bg-testPrimary-100">
									<i className="fa-regular fa-user"></i>
								</button>
								<div
									ref={dropdownRef}
									className="flex absolute right-6 left-auto invisible flex-col font-bold bg-white rounded border border-black shadow-lg shadow-gray-500/50 dropdown-content"
								>
									<NavLink
										to="settings/profile"
										className="p-2 rounded-t hover:bg-testBackground-100"
									>
										Ver Perfil
									</NavLink>
									<NavLink
										to="logout"
										className="p-2 rounded-b hover:bg-testBackground-100"
									>
										Cerrar sesión
									</NavLink>
								</div>
							</li>
						</>
					)}
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
