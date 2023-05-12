import { formatDate, formatTime } from 'src/helpers/reports';

const ReportsTable = ({ reports }) => {
	let renderReports = [];
	let response = 'No Reports Found';

	if (reports.length > 0) {
		renderReports = reports.map((report) => (
			<tr
				key={report.id}
				className="border border-testText-100 hover:bg-testBackground-100"
			>
				<td className="py-1">{formatDate(report.start_date)}</td>
				<td className="py-1">{formatTime(report.duration)}</td>
				<td className="py-1">{report.total_kg}kg</td>
				<td className="py-1">{report.olive_type}</td>
			</tr>
		));
		response = (
			<table id="reportsTable" className="w-full text-center">
				<thead className="text-sm text-white border-t border-r border-l border-testText-100 bg-testPrimary-100">
					<tr>
						<th className="p-2">Fecha</th>
						<th className="p-2">Duración</th>
						<th className="p-2">Peso Total</th>
						<th className="p-2">Tipo de Oliva</th>
					</tr>
				</thead>
				<tbody>{renderReports}</tbody>
			</table>
		);
	}

	return <>{response}</>;
};

export default ReportsTable;
