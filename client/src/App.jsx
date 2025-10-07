import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Header from './components/Header';
import AuthProvider from './context/AuthContext';

function App() {
	const location = useLocation();

	const isMinimalHeader =
		location.pathname.startsWith('/admin') ||
		['/login', '/register'].includes(location.pathname);

	return (
		<AuthProvider>
			{!isMinimalHeader && <Header />}
			<AppRouter />
		</AuthProvider>
	);
}

export default App;
