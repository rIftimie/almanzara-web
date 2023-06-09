import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { UserContextProvider } from './context/UserContext';

function App() {
	return (
		<>
			<UserContextProvider>
				<div className="flex flex-col h-screen max-h-screen">
					<Navbar />
					<Outlet />
					<Footer />
				</div>
			</UserContextProvider>
		</>
	);
}

export default App;
