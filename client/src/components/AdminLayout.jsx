import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const AdminLayout = () => {
	const { user, isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// Redirect to login if not authenticated or not admin
		if (!isAuthenticated || user?.data?.role !== 'admin') {
			navigate('/login');
		}
	}, [isAuthenticated, user, navigate]);

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<div className="flex min-h-screen">
			{/* ✅ Sidebar */}
			<aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
				<h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
				<nav className="flex flex-col space-y-2">
					<Link to="/admin/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</Link>
                    <Link to="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded">Users</Link>
                    <Link to="/admin/products" className="hover:bg-gray-700 px-3 py-2 rounded">Products</Link>
                    <Link to="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded">Orders</Link>
				</nav>
				<button
					onClick={handleLogout}
					className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
				>
					Logout
				</button>
			</aside>

			{/* ✅ Main Content */}
			<main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};

export default AdminLayout;
