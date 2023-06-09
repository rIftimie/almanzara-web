import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from 'src/context/UserContext';
import { createReport, updateReport } from 'src/helpers/api/reports';
import { useParams, useLoaderData } from 'react-router-dom';
import { convertToLocal } from 'src/helpers';

import './ReportForm.css';

const ReportForm = () => {
	const { user } = useUserContext();
	const { id } = useParams();
	const report = useLoaderData();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	async function handleLoadReport() {
		setValue('start_date', convertToLocal(report.start_date));
		setValue('duration_hours', report.duration.split(':')[0]);
		setValue('duration_minutes', report.duration.split(':')[1]);
		setValue('duration_seconds', report.duration.split(':')[2]);
		setValue('total_gr', report.total_gr);
		setValue('olive_type', report.olive_type);
	}

	useEffect(() => {
		if (report) {
			handleLoadReport();
		}
	}, []);

	async function handleSubmitReport(data) {
		data.duration = `${data.duration_hours}:${data.duration_minutes}:${data.duration_seconds}`;
		delete data.duration_hours;
		delete data.duration_minutes;
		delete data.duration_seconds;
		data.user = user.id;

		if (report) {
			data.id = id;
			const response = await updateReport(data);
			if (response.ok) {
				window.alert('Informe de pesaje actualizado');
			}
		} else {
			const response = await createReport(data);
			if (response.ok) {
				window.alert('Informe de pesaje creado');
				reset();
			}
		}
	}

	function onSubmit(data) {
		handleSubmitReport(data);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			id="reportForm"
			className="flex flex-col p-3 space-y-2 lg:m-auto lg:mt-4 lg:w-1/3 bg-testPrimary-200"
		>
			<header>Nuevo Pesaje</header>
			<label htmlFor="start_date" className="flex flex-col">
				<span> FECHA </span>
				<input
					type="datetime-local"
					{...register('start_date', { required: true })}
				/>
			</label>
			<label htmlFor="duration" className="flex flex-col">
				<span> DURACION </span>
				<div className="flex">
					<input
						type="number"
						min="0"
						max="59"
						defaultValue="00"
						className="px-2 py-1 w-1/4"
						{...register('duration_hours', { required: true })}
					/>
					Horas
					<input
						type="number"
						min="0"
						max="59"
						defaultValue="00"
						className="px-2 py-1 w-1/4"
						{...register('duration_minutes', { required: true })}
					/>
					Minutos
					<input
						type="number"
						min="0"
						max="59"
						defaultValue="00"
						className="px-2 py-1 w-1/4"
						{...register('duration_seconds', { required: true })}
					/>
					Segundos
				</div>
			</label>
			<label htmlFor="total_gr" className="flex flex-col">
				<span> PESO EN GR </span>
				<input
					className="px-2 py-1"
					{...register('total_gr', { required: true })}
				/>
			</label>
			<label htmlFor="olive_type">
				Tipo de Oliva:
				<select
					className="px-2 bg-white rounded-xl"
					{...register('olive_type', { required: true })}
				>
					<option value="suelo">Suelo</option>
					<option value="aire">Aire</option>
					<option value="mezcla">Mezcla</option>
				</select>
			</label>

			{/* errors will return when field validation fails  */}
			{errors.exampleRequired && <span>This field is required</span>}

			<input
				type="submit"
				value="CREAR"
				className="px-2 py-1 text-white rounded cursor-pointer hover:bg-testPrimary-100/70 bg-testPrimary-100 w-fit"
			/>
		</form>
	);
};

export default ReportForm;
