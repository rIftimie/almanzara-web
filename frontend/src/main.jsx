import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginForm from 'src/components/login/LoginForm';
import LogoutContainer from 'src/containers/logout/LogoutContainer';
import ProfileContainer from 'src/containers/profile/ProfileContainer';
import ReportContainer from 'src/containers/report/ReportContainer';
import UsersContainer from 'src/containers/admin/users/UsersContainer';
import ErrorPage from './error/ErrorPage';
import './main.css';
import UserForm from './components/admin/users/UserForm';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: 'login',
				element: <LoginForm />,
			},
			{
				path: 'reports',
				element: <ReportContainer />,
			},
			{
				path: 'settings/profile',
				element: <ProfileContainer />,
			},
			{
				path: 'admin/users',
				element: <UsersContainer />,
			},
			{
				path: 'admin/users/new',
				element: <UserForm />,
			},
			{
				path: 'logout',
				element: <LogoutContainer />,
			},
		],
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
