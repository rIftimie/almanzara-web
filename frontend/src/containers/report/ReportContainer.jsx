import { useEffect, useState } from 'react';
import ReportsFilter from 'src/components/reports/ReportsFilter';
import ReportsHeader from 'src/components/reports/ReportsHeader';
import ReportsTable from 'src/components/reports/ReportsTable';
import { useUserContext } from 'src/context/UserContext';
import { getReports } from '/src/helpers/api/reports';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import './ReportContainer.css';
import Pagination from '../../components/reports/Pagination';

const ReportContainer = () => {
	const { user } = useUserContext();

	// Check if user is logged in
	if (!user) {
		navigate('/login');
	}

	// useStates
	const [reports, setReports] = useState({ count: 0, results: null });
	const [showFilter, setShowFilter] = useState(false);

	// Pagination
	const navigate = useNavigate();
	const search = useLocation().search;
	const pageNumber = Number(new URLSearchParams(search).get('page')) || 1;
	const pageSize = Number(new URLSearchParams(search).get('size')) || 10;

	// Loading
	let isLoading = true;

	if (reports.results) {
		isLoading = false;
	}

	useEffect(() => {
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
			<ReportsFilter showFilter={showFilter} />
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
					'Loading Reports...'
				)}
			</section>
		</main>
	);
};

export default ReportContainer;
