import { selectAllReports } from 'src/helpers/';
import ReportRow from './ReportRow';

const ReportsTable = ({ reports }) => {
	let renderReports = [];
	let response = 'No Reports Found';

	if (reports.length > 0) {
		renderReports = reports.map((report) => (
			<ReportRow key={report.id} report={report} />
		));

		response = (
			<table id="reportsTable" className="w-full text-center">
				<thead className="text-sm text-white border-t border-r border-l border-testText-100 bg-testPrimary-100">
					<tr>
						<th className="p-2">
							<input
								type="checkbox"
								className="main-select-report"
								onClick={() => selectAllReports()}
							/>
						</th>
						<th className="p-2">ID</th>
						<th className="p-2">FECHA</th>
						<th className="p-2">DURACION</th>
						<th className="p-2">PESO TOTAL</th>
						<th className="p-2">TIPO DE OLIVA</th>
						<th className="p-2">ACCIONES</th>
					</tr>
				</thead>
				<tbody className="">{renderReports}</tbody>
			</table>
		);
	}

	return <>{response}</>;
};

export default ReportsTable;
