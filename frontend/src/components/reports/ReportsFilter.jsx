import { useForm } from 'react-hook-form';

const ReportsFilter = ({ showFilter }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	function onSubmit(data) {
		console.log(data);
	}

	return (
		<>
			{showFilter && (
				<aside className="sticky top-0 -z-10 sm:w-1/3 bg-testPrimary-200">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col p-4 text-sm reports-filter"
					>
						<label htmlFor="dateFrom">
							Desde:
							<input
								className="px-2 rounded-full"
								type="date"
								placeholder="DD-MM-YYYY"
								name=""
								{...register('dateFrom')}
							/>
						</label>
						<label htmlFor="dateTo">
							Hasta:
							<input
								className="px-2 rounded-full"
								type="date"
								placeholder="DD-MM-YYYY"
								name=""
								{...register('dateTo')}
							/>
						</label>
						<label htmlFor="durationFrom">
							Duracion: <br /> Desde:
							<input
								className="px-2 w-1/6 rounded-full"
								placeholder="HH:MM"
								type="text"
								name=""
								{...register('durationFrom')}
							/>
							Hasta:
							<input
								className="px-2 w-1/6 rounded-full"
								placeholder="HH:MM"
								type="text"
								name=""
								{...register('example')}
							/>
						</label>
						<label htmlFor="durationTo">
							Peso: <br /> Desde
							<input
								className="px-2 w-1/6 rounded-full"
								type="text"
								name=""
								{...register('example')}
							/>
							kg hasta:
							<input
								className="px-2 w-1/6 rounded-full"
								type="text"
								name=""
								{...register('example')}
							/>
							kg
						</label>
						<label htmlFor="oliveType">
							Tipo de Oliva:
							<select
								name="oliveType"
								id="oliveType"
								className="px-2 bg-white rounded-xl"
								{...register('example')}
							>
								<option value="suelo">Suelo</option>
								<option value="aire">Aire</option>
								<option value="mezcla">Mezcla</option>
							</select>
						</label>
						<hr className="mt-2" />
						<input
							className="px-3 py-1 mt-2 bg-white rounded-full cursor-pointer hover:bg-white/80"
							type="submit"
							value="Filtrar"
						/>
					</form>
				</aside>
			)}
		</>
	);
};

export default ReportsFilter;
