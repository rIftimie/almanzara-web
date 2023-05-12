import { useContext, useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
	const [user, setUser] = useState({
		id: 2,
		username: 'agon',
		first_name: 'Robert',
		last_name: 'Iftimie',
		roles: ['ROLE_USER', 'ROLE_ADMIN'],
		created_at: '2023-05-01T16:23:00.000Z',
		updated_at: '2023-05-01T16:23:00.000Z',
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
