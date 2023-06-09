import {
	formatDate,
	formatTime,
	selectAllReports,
	getSelectedReports,
} from 'src/helpers/';
import { useNavigate } from 'react-router-dom';

const ReportsTable = ({ reports }) => {
	let renderReports = [];
	let response = 'No Reports Found';
	const navigate = useNavigate();

	function handleOnClickRow(id) {
		return navigate('/report/' + id);
	}

	if (reports.length > 0) {
		renderReports = reports.map((report) => (
			<tr
				key={report.id}
				className="border border-testText-100 hover:bg-testBackground-100"
			>
				<td>
					<input
						type="checkbox"
						data-id={report.id}
						name="reportId"
						className="select-report"
					/>
				</td>
				<td onClick={() => handleOnClickRow(report.id)} className="py-1">
					{report.id}
				</td>
				<td onClick={() => handleOnClickRow(report.id)} className="py-1">
					{formatDate(report.start_date)}
				</td>
				<td onClick={() => handleOnClickRow(report.id)} className="py-1">
					{formatTime(report.duration)}
				</td>
				<td onClick={() => handleOnClickRow(report.id)} className="py-1">
					{report.total_gr / 1000}kg
				</td>
				<td onClick={() => handleOnClickRow(report.id)} className="py-1">
					{report.olive_type}
				</td>
				<td className="py-1">
					<i
						onClick={() => console.log('actions')}
						className="p-1.5 rounded-full cursor-pointer fa-sharp fa-solid fa-gear hover:bg-testBackground-200"
					></i>
				</td>
			</tr>
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
				<tbody>{renderReports}</tbody>
			</table>
		);
	}

	return <>{response}</>;
};

export default ReportsTable;
