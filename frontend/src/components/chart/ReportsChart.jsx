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
	const monthsFirstYear = new Map([]);
	monthsFirstYear.set('Enero', 0);
	monthsFirstYear.set('Febrero', 0);
	monthsFirstYear.set('Marzo', 0);
	monthsFirstYear.set('Abril', 0);
	monthsFirstYear.set('Mayo', 0);
	monthsFirstYear.set('Junio', 0);
	monthsFirstYear.set('Julio', 0);
	monthsFirstYear.set('Agosto', 0);
	monthsFirstYear.set('Septiembre', 0);
	monthsFirstYear.set('Octubre', 0);
	monthsFirstYear.set('Noviembre', 0);
	monthsFirstYear.set('Diciembre', 0);

	const monthsSecondYear = new Map([]);
	monthsSecondYear.set('Enero', 0);
	monthsSecondYear.set('Febrero', 0);
	monthsSecondYear.set('Marzo', 0);
	monthsSecondYear.set('Abril', 0);
	monthsSecondYear.set('Mayo', 0);
	monthsSecondYear.set('Junio', 0);
	monthsSecondYear.set('Julio', 0);
	monthsSecondYear.set('Agosto', 0);
	monthsSecondYear.set('Septiembre', 0);
	monthsSecondYear.set('Octubre', 0);
	monthsSecondYear.set('Noviembre', 0);
	monthsSecondYear.set('Diciembre', 0);

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
			<section className="container flex justify-center p-2 w-auto h-96 md:p-0">
				<Line data={data} />
			</section>
		</>
	);
}

export default ReportsChart;
