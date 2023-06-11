import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useUserContext } from 'src/context/UserContext';

import ReportsFilter from 'src/components/reports/ReportsFilter';
import ReportsHeader from 'src/components/reports/ReportsHeader';
import ReportsTable from 'src/components/reports/ReportsTable';
import Pagination from 'src/components/reports/Pagination';

import { getReports } from '/src/helpers/api/reports';
import { defaultPagination } from 'src/helpers';

import './ReportContainer.css';

const ReportContainer = () => {
	const { user } = useUserContext();

	const navigate = useNavigate();

	// useStates
	const [reports, setReports] = useState({ count: 0, results: null });
	const [showFilter, setShowFilter] = useState(false);

	// Pagination
	const search = useLocation().search;
	const { pageNumber, pageSize } = defaultPagination(search);

	// Loading
	let isLoading = true;

	if (reports.results) {
		isLoading = false;
	}

	useEffect(() => {
		// Check if user is logged in
		if (!user) {
			navigate('/login');
		}

		async function handleLoadReports() {
			const data = await getReports({
				user,
				pagination: { page: pageNumber, size: pageSize },
			});
			setReports(data);
		}

		handleLoadReports();
	}, [pageNumber]);

	return (
		<main
			id="reportsContainer"
			className="flex flex-col border grow sm:flex-row-reverse border-testAccent-100"
		>
			<ReportsFilter
				showFilter={showFilter}
				useStateReports={[reports, setReports]}
			/>
			<section
				id="reportsSection"
				className="flex overflow-scroll flex-col p-4 pt-0 sm:w-full"
			>
				<ReportsHeader
					useStateReports={[reports, setReports]}
					useStateFilter={[showFilter, setShowFilter]}
				/>
				<Pagination
					count={reports.count}
					pageSize={pageSize}
					pageNumber={pageNumber}
				/>
				{!isLoading ? (
					<ReportsTable reports={reports.results} />
				) : (
					'Cargando Informes...'
				)}
			</section>
		</main>
	);
};

export default ReportContainer;
