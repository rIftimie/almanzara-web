import { useState } from 'react';
import { useEffect } from 'react';
import ReportsChart from 'src/components/chart/ReportsChart';
import { useUserContext } from 'src/context/UserContext';
import { getReportsByYear } from 'src/helpers/api/reports';

import './HomeContainer.css';

const HomeContainer = () => {
	const { user } = useUserContext();

	// useStates
	const [reports, setReports] = useState({
		firstYear: { results: [] },
		secondYear: { results: [] },
	});

	function handleOnSubmit(e) {
		e.preventDefault();
		handleLoadReports(e.target.firstYear.value, e.target.secondYear.value);
	}

	async function handleLoadReports(
		firstYear = new Date().getFullYear(),
		secondYear = null
	) {
		if (firstYear == '') {
			firstYear = null;
		}
		if (secondYear == '') {
			secondYear = null;
		}
		const data = await getReportsByYear({
			user,
			firstYear,
			secondYear,
		});
		setReports(data);
	}

	useEffect(() => {
		if (user) {
			handleLoadReports();
		}
	}, []);

	return user ? (
		<main className="flex flex-col border grow border-testAccent-100">
			<form
				id="reportsGraphForm"
				className="flex justify-center p-2 space-x-2 bg-gray-200"
				onSubmit={handleOnSubmit}
			>
				<input
					className="w-12 text-center"
					type="number"
					name="firstYear"
					min="1900"
					max="2099"
					defaultValue={new Date().getFullYear()}
				/>
				<input
					className="px-2 py-1 font-bold text-white rounded-full cursor-pointer bg-testPrimary-100"
					type="submit"
					value="Comparar"
				/>
				<input
					className="w-12 text-center"
					min="1900"
					max="2099"
					type="number"
					name="secondYear"
					id=""
				/>
			</form>
			<div className="flex justify-around">
				<span>
					Pesajes realizados en {reports.firstYear.year}:
					{' ' + reports.firstYear.results.length}
				</span>
				<span>
					Pesajes realizados en {reports.secondYear.year}:
					{' ' + reports.secondYear.results.length}
				</span>
			</div>
			{reports.firstYear.results != null && (
				<ReportsChart
					firstYear={reports.firstYear}
					secondYear={reports.secondYear}
				/>
			)}
		</main>
	) : (
		<main className="h-full"></main>
	);
};

export default HomeContainer;
