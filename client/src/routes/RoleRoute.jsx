// RoleRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ allowedRoles }) => {
	const { user, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	if (!user || !allowedRoles.includes(user.data.role)) {
		return <Navigate to="/" />;
	}

	return <Outlet />; // ✅ important for nested routing
};

export default RoleRoute;
