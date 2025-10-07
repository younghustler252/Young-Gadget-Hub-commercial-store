import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ allowedRoles, children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user || !allowedRoles.includes(user.data.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RoleRoute;
