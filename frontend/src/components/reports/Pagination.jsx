import React from 'react';
import { NavLink } from 'react-router-dom';

const Pagination = ({ count, pageSize, pageNumber }) => {
	const pages = [];

	for (let i = 1; i <= Math.ceil(count / pageSize); i++) {
		pages.push(
			<NavLink
				to={`?page=${i}&size=${pageSize}`}
				key={i}
				className={'p-2' + (i == pageNumber ? ' bg-gray-200' : '')}
			>
				{i}
			</NavLink>
		);
	}

	return (
		<div>
			{pageNumber > 1 && (
				<>
					<NavLink to={'?page=' + (pageNumber - 1)}>
						<i className="text-xs fa-solid fa-angles-left"></i>
					</NavLink>
				</>
			)}
			{pages}
			{pageNumber < Math.ceil(count / pageSize) && (
				<NavLink to={'?page=' + (pageNumber + 1)}>
					<i className="text-xs fa-solid fa-angles-right"></i>
				</NavLink>
			)}
		</div>
	);
};

export default Pagination;
