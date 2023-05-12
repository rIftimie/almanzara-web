import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<div id="error-page">
			<h1>Oops! Sorry, an unexpected error has occurred.</h1>
			<p>
				Error <i>{error.status + ' ' + error.statusText}</i>
			</p>
		</div>
	);
};

export default ErrorPage;
