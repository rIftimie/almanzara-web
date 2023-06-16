import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import 'src/helpers/momentjs';
import moment from 'moment';
import { monthsFirstYear, monthsSecondYear } from 'src/helpers/chart';

function ReportsChart({ firstYear, secondYear }) {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		LineElement,
		PointElement,
		Title,
		Tooltip,
		Legend
	);

	for (let i = 0; i < firstYear.results.length; i++) {
		let reportMonth = moment(firstYear.results[i].start_date).format('MMMM');
		monthsFirstYear.set(reportMonth, monthsFirstYear.get(reportMonth) + 1);
	}

	for (let i = 0; i < secondYear.results.length; i++) {
		let reportMonth = moment(secondYear.results[i].start_date).format('MMMM');
		monthsSecondYear.set(reportMonth, monthsSecondYear.get(reportMonth) + 1);
	}
	let data;

	if (secondYear.results.length) {
		data = {
			labels: Array.from(monthsFirstYear.keys()),
			datasets: [
				{
					label: firstYear.year,
					data: Array.from(monthsFirstYear.values()),
					borderColor: '#00C4C4',
					borderWidth: 2,
				},
				{
					label: secondYear.year,
					data: Array.from(monthsSecondYear.values()),
					borderColor: '#156F6F',
					borderWidth: 2,
				},
			],
		};
	} else {
		data = {
			labels: Array.from(monthsFirstYear.keys()),
			datasets: [
				{
					label: firstYear.year,
					data: Array.from(monthsFirstYear.values()),
					borderColor: '#00C4C4',
					borderWidth: 2,
				},
			],
		};
	}

	return (
		<>
			<section className="container flex justify-center p-2 w-auto max-h-96 max-w-96 md:p-0">
				<Line data={data} />
			</section>
		</>
	);
}

export default ReportsChart;
