import { NavLink, useLocation } from 'react-router-dom';

import { useUserContext } from 'src/context/UserContext';

import { getReports, deleteReports } from 'src/helpers/api/reports';
import { getSelectedReports } from 'src/helpers';
import { defaultPagination } from 'src/helpers';

const ReportsHeader = ({ useStateReports, useStateFilter }) => {
	const { user } = useUserContext();
	const [showFilter, setShowFilter] = useStateFilter;
	const [reports, setReports] = useStateReports;

	const search = useLocation().search;
	const { pageNumber, pageSize } = defaultPagination(search);

	return (
		<header className="flex sticky top-0 z-10 justify-end px-2 py-1 space-x-2 font-bold bg-white">
			<NavLink to="/report/new">Crear Pesaje</NavLink>
			<a
				href="#"
				onClick={async () => {
					const reportsIds = getSelectedReports();
					if (reportsIds.length > 0) {
						const response = await deleteReports(reportsIds);
						if (response.ok) {
							setReports({
								...reports,
								results: reports.results.filter(
									(reports) => !reportsIds.includes(reports.id.toString())
								),
							});
						}
					} else {
						window.alert('Debes seleccionar al menos un informe para eliminar');
					}
				}}
			>
				<i className="fa-solid fa-trash"></i> Eliminar seleccionados
			</a>
			<div
				className="cursor-pointer"
				onClick={async () => {
					const data = await getReports({
						user,
						pagination: { page: pageNumber, size: pageSize },
					});
					setReports(data);
				}}
			>
				<i className="fa-solid fa-arrows-rotate"></i> Actualizar
			</div>
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
