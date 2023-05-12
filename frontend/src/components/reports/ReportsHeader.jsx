import { useRef } from 'react';
import { useUserContext } from '../../context/UserContext';
import { getAllReports } from '../../helpers/fetch';

const ReportsHeader = ({ setReports, useStateFilter }) => {
	const { user } = useUserContext();
	const [showFilter, setShowFilter] = useStateFilter;

	return (
		<header className="flex justify-end px-2 py-1 space-x-2 font-bold">
			<a
				href="#"
				onClick={async () => {
					const data = await getAllReports({ user });
					setReports(data);
				}}
			>
				<i className="fa-solid fa-arrows-rotate"></i> Actualizar
			</a>
			<a
				href="#"
				onClick={() => {
					setShowFilter(!showFilter);
				}}
			>
				<i className="fa-solid fa-filter"></i> Filtrar
			</a>
		</header>
	);
};

export default ReportsHeader;
