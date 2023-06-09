import { useLoaderData } from 'react-router-dom';
import { formatDate } from 'src/helpers';

import './Report.css';

const Report = () => {
	const report = useLoaderData();

	return (
		<>
			{
				<main id="reportContainer" className="flex grow">
					<section className="flex flex-col p-3 pb-5 m-auto my-3 space-y-2 w-9/12 text-white lg:w-1/2 min-h-fit h-fit bg-testPrimary-100">
						<section>
							<span className="text-testPrimary-300">PESAJE REALIZADO POR</span>
							<div className="px-2 py-1 ml-2 w-1/2 border border-testText-100 bg-testBackground-100 text-testText-100">
								{report.user.first_name + ' ' + report.user.last_name}
							</div>
						</section>
						<section className="flex flex-wrap">
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">FECHA</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{formatDate(report.start_date)}
								</div>
							</div>
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">DURACION</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{report.duration}
								</div>
							</div>
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">TOTAL GRAMOS</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{report.total_gr + 'gr'}
								</div>
							</div>
							<div className="w-full sm:w-1/2">
								<span className="text-testPrimary-300">TIPO DE OLIVA</span>
								<div className="px-2 py-1 ml-2 border border-testText-100 bg-testBackground-100 text-testText-100">
									{report.olive_type}
								</div>
							</div>
						</section>
					</section>
				</main>
			}
		</>
	);
};

export default Report;
