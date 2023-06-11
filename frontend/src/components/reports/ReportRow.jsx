import { PDFDownloadLink } from '@react-pdf/renderer';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { formatDate, formatTime } from 'src/helpers';

import ReportPDF from '../pdf/ReportPDF';

const ReportRow = ({ report }) => {
	const navigate = useNavigate();

	const actionsDropdownRef = useRef(null);

	function handleOnClickRow(id) {
		return navigate('/report/' + id);
	}

	function handleOnClickActions() {
		if (actionsDropdownRef.current.style.visibility == 'visible') {
			actionsDropdownRef.current.style.visibility = 'hidden';
		} else {
			const dropdowns = document.querySelectorAll('.actionsDropdown');
			for (let i = 0; i < dropdowns.length; i++) {
				const element = dropdowns[i];
				if (element.style.visibility == 'visible') {
					element.style.visibility = 'hidden';
				}
			}
			actionsDropdownRef.current.style.visibility = 'visible';
		}
	}

	return (
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
			<td onClick={() => handleOnClickRow(report.id)}>{report.id}</td>
			<td onClick={() => handleOnClickRow(report.id)}>
				{report.first_name + ' ' + report.last_name}
			</td>
			<td onClick={() => handleOnClickRow(report.id)}>
				{formatDate(report.start_date)}
			</td>
			<td onClick={() => handleOnClickRow(report.id)}>
				{formatTime(report.duration)}
			</td>
			<td onClick={() => handleOnClickRow(report.id)}>
				{report.total_gr / 1000}kg
			</td>
			<td onClick={() => handleOnClickRow(report.id)}>{report.olive_type}</td>
			<td>
				<div
					onClick={() => {
						handleOnClickActions();
					}}
					className="relative"
				>
					<i className="p-1 px-2 text-base rounded-full cursor-pointer fa-sharp fa-solid fa-gear hover:bg-testBackground-200"></i>
					<div
						ref={actionsDropdownRef}
						className={
							'flex absolute top-8 right-16 invisible z-10 flex-col font-bold bg-white shadow-lg text-start shadow-gray-500/50 actionsDropdown'
						}
					>
						<NavLink
							to={'/report/' + report.id}
							className="p-2 w-full rounded-t hover:bg-testBackground-100"
						>
							Mostrar
						</NavLink>
						<NavLink
							to={'/report/' + report.id + '/update'}
							className="p-2 w-full rounded-t hover:bg-testBackground-100"
						>
							Actualizar
						</NavLink>
						<PDFDownloadLink
							className="p-2 w-full rounded-t hover:bg-testBackground-100"
							document={<ReportPDF report={report} />}
							fileName={`report${report.id}_${report.start_date
								.replace('.000Z', '')
								.replace(':', '')
								.replace(':', '')}.pdf`}
						>
							{({ blob, url, loading, error }) =>
								loading ? 'Cargando...' : 'Descargar como PDF'
							}
						</PDFDownloadLink>
					</div>
				</div>
			</td>
		</tr>
	);
};

export default ReportRow;
