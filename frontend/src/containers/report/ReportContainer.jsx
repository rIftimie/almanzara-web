import { useEffect, useState } from 'react';
import ReportsFilter from 'src/components/reports/ReportsFilter';
import ReportsHeader from 'src/components/reports/ReportsHeader';
import ReportsTable from 'src/components/reports/ReportsTable';
import { useUserContext } from 'src/context/UserContext';
import { getAllReports } from '/src/helpers/fetch';
import { useNavigate } from 'react-router-dom';

import './ReportContainer.css';

const ReportContainer = () => {
	const { user } = useUserContext();
	const navigate = useNavigate();
	const [reports, setReports] = useState(null);
	const [showFilter, setShowFilter] = useState(false);

	let isLoading = true;

	if (reports) {
		isLoading = false;
	}

	useEffect(() => {
		async function handleLoadReports() {
			const data = await getAllReports({ user });
			setReports(data);
		}

		if (!user) {
			navigate('/login');
		} else {
			handleLoadReports();
		}
	}, [user]);

	return (
		<main className="flex flex-col-reverse border sm:flex-row border-testAccent-100">
			<section className="flex flex-col p-2 pt-0 sm:w-full">
				<ReportsHeader
					setReports={setReports}
					useStateFilter={[showFilter, setShowFilter]}
				/>
				{!isLoading ? <ReportsTable reports={reports} /> : 'Loading Reports...'}
			</section>
			<ReportsFilter showFilter={showFilter} />
		</main>
	);
};

export default ReportContainer;
