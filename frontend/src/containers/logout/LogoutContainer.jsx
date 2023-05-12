import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';

const LogoutContainer = () => {
	const { setUser } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		setUser(null);
		return navigate('/');
	}, [setUser]);

	return <div>Cerrando sesión...</div>;
};

export default LogoutContainer;
