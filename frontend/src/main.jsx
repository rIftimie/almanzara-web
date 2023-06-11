import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginForm from 'src/components/login/LoginForm';
import LogoutContainer from 'src/containers/logout/LogoutContainer';
import ProfileContainer from 'src/containers/profile/ProfileContainer';
import ReportContainer from 'src/containers/report/ReportContainer';
import UserContainer from 'src/containers/admin/users/UserContainer';
import ErrorPage from 'src/error/ErrorPage';
import UserForm from 'src/components/admin/users/UserForm';
import 'src/main.css';
import User from 'src/components/admin/users/User';
import Report from 'src/components/reports/Report';
import ReportForm from 'src/components/reports/ReportForm';
import { findUserById } from 'src/helpers/api/users';
import { findReportById } from 'src/helpers/api/reports';
import HomeContainer from './containers/home/HomeContainer';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <HomeContainer />,
			},
			{
				path: 'login',
				element: <LoginForm />,
			},
			{
				path: 'reports',
				element: <ReportContainer />,
			},
			{
				path: 'report/:id',
				element: <Report />,
				loader: async ({ params }) => {
					return findReportById(params.id);
				},
			},
			{
				path: 'report/:id/update',
				element: <ReportForm />,
				loader: async ({ params }) => {
					return findReportById(params.id);
				},
			},
			{
				path: 'report/new',
				element: <ReportForm />,
			},
			{
				path: 'admin/users',
				element: <UserContainer />,
			},
			{
				path: 'admin/user/:id',
				element: <User />,
				loader: async ({ params }) => {
					return findUserById(params.id);
				},
			},
			{
				path: 'admin/user/:id/update',
				element: <UserForm />,
				loader: async ({ params }) => {
					return findUserById(params.id);
				},
			},
			{
				path: 'admin/user/new',
				element: <UserForm />,
			},
			{
				path: 'settings/profile',
				element: <ProfileContainer />,
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
	<RouterProvider router={router} />
);
