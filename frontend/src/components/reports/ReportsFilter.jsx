import { NavLink } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import { getReports } from 'src/helpers/api/reports';
import { useForm } from 'react-hook-form';

const ReportsFilter = ({ showFilter, useStateReports }) => {
	const { user } = useUserContext();
	const [reports, setReports] = useStateReports;

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	async function handleFilterReports(filters) {
		for (let key in filters) {
			if (filters[key] == '' || filters[key] == ' ') {
				filters[key] = null;
			}
		}
		const data = await getReports({
			user,
			filters,
		});
		setReports(data);
	}

	function onSubmit(data) {
		handleFilterReports(data);
	}

	return (
		<>
			{showFilter && (
				<aside className="sm:w-1/3 bg-testPrimary-200">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col p-4 text-sm reports-filter"
					>
						<label htmlFor="dateFrom">
							Nombre de usuario:
							<input
								className="px-2 rounded-full"
								type="text"
								name="username"
								{...register('username')}
							/>
						</label>
						<label htmlFor="dateFrom">
							Desde:
							<input
								className="px-2 rounded-full"
								type="date"
								placeholder="DD-MM-YYYY"
								name="date_from"
								{...register('date_from')}
							/>
						</label>
						<label htmlFor="dateTo">
							Hasta:
							<input
								className="px-2 rounded-full"
								type="date"
								placeholder="DD-MM-YYYY"
								name="date_to"
								{...register('date_to')}
							/>
						</label>
						<label htmlFor="durationFrom">
							Duracion: <br /> Desde
							<input
								className="px-2 w-1/6 rounded-full"
								placeholder="HH:MM"
								type="text"
								name="duration_from"
								{...register('duration_from')}
							/>
							hasta
							<input
								className="px-2 w-1/6 rounded-full"
								placeholder="HH:MM"
								type="text"
								name="duration_to"
								{...register('duration_to')}
							/>
						</label>
						<label htmlFor="durationTo">
							Peso en gramos: <br /> Desde
							<input
								className="px-2 w-1/6 rounded-full"
								type="text"
								name="total_gr_from"
								{...register('total_gr_from')}
							/>
							hasta
							<input
								className="px-2 w-1/6 rounded-full"
								type="text"
								name="total_gr_to"
								{...register('total_gr_to')}
							/>
						</label>
						<label htmlFor="oliveType">
							Tipo de Oliva:
							<select
								id="oliveType"
								className="px-2 bg-white rounded-xl"
								name="olive_type"
								{...register('olive_type')}
							>
								<option value=" " selected disabled hidden></option>
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
						<NavLink to="">Limpiar Filtro</NavLink>
					</form>
				</aside>
			)}
		</>
	);
};

export default ReportsFilter;
