import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	return (
		<div id="error-page">
			<h1 className="text-xl">
				Oops! Sorry, an unexpected error has occurred.
			</h1>
			<p>{error.message}</p>
		</div>
	);
};

export default ErrorPage;
