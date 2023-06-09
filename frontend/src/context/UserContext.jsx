import { useContext, useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
	const [user, setUser] = useState({
		id: 1,
		username: 'admin',
		password: 'password',
		first_name: 'Admin',
		last_name: 'Test',
		email: 'test@almanzara.com',
		roles: ['ROLE_ADMIN', 'ROLE_USER'],
		created_at: '2023-05-01 18:23:00',
		updated_at: '2023-05-01 18:23:00',
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	return useContext(UserContext);
}
