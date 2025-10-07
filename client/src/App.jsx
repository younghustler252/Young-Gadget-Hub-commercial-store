import React from 'react';
import AppRouter from './routes/AppRouter';
import Header from './components/Header'; // ✅ make sure this path matches
import AuthProvider from './context/AuthContext';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const minimalHeaderRoutes = ['/login', '/register'];
  const isMinimalHeader = minimalHeaderRoutes.includes(location.pathname);
  return (
    <>
      <AuthProvider> 
        <Header minimal={isMinimalHeader} />
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
