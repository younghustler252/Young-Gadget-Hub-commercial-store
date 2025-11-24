import { useEffect, useState } from "react";
import {
	FiUsers,
	FiBox,
	FiShoppingCart,
	FiDollarSign
} from "react-icons/fi";
import { getDashboardMetrics } from "../../services/productService";  // Make sure this function makes the correct API call

const Dashboard = () => {
	const [stats, setStats] = useState({
		users: 0,
		products: 0,
		orders: 0,
		sales: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const data = await getDashboardMetrics();  // Call the correct API
				setStats({
					users: data.totalUsers,  // Match the response structure
					products: data.totalProducts,
					orders: data.totalOrders,
					sales: data.sales,  // Ensure 'sales' is the total revenue from the backend
				});
			} catch (error) {
				console.error("Error fetching dashboard metrics:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	return (
		<div className="min-h-screen p-4">
			{/* 🔥 DASHBOARD HEADER */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
				<p className="text-gray-600 text-sm">Welcome back, admin.</p>
			</div>

			{/* 📊 STAT CARDS */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<StatCard
					title="Users"
					value={stats.users}
					icon={<FiUsers />}
					color="bg-blue-100 text-blue-600"
				/>
				<StatCard
					title="Products"
					value={stats.products}
					icon={<FiBox />}
					color="bg-green-100 text-green-600"
				/>
				<StatCard
					title="Orders"
					value={stats.orders}
					icon={<FiShoppingCart />}
					color="bg-yellow-100 text-yellow-600"
				/>
				<StatCard
					title="Sales"
					value={`₦${(stats.sales ?? 0).toLocaleString()}`}  // Safely handle 'sales' with default 0
					icon={<FiDollarSign />}
					color="bg-purple-100 text-purple-600"
				/>
			</div>

			{/* 🧾 LATEST ORDERS (Placeholder) */}
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">Latest Orders</h2>

				{/* Show loading message if data is still loading */}
				{loading ? (
					<p className="text-gray-500">Loading orders...</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead className="text-xs text-gray-700 uppercase bg-gray-100">
								<tr>
									<th className="px-4 py-2">Order ID</th>
									<th className="px-4 py-2">Customer</th>
									<th className="px-4 py-2">Total</th>
									<th className="px-4 py-2">Status</th>
								</tr>
							</thead>
							<tbody>
								{/* Here, you would dynamically map over actual orders data */}
								{[1, 2, 3].map((order) => (
									<tr key={order} className="border-b">
										<td className="px-4 py-2">ORD00{order}</td>
										<td className="px-4 py-2">John Doe</td>
										<td className="px-4 py-2">₦12,000</td>
										<td className="px-4 py-2">
											<span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">
												Paid
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;

const StatCard = ({ title, value, icon, color }) => (
	<div className={`flex items-center p-4 rounded-lg shadow ${color} bg-opacity-50`}>
		<div className="text-2xl mr-4">{icon}</div>
		<div>
			<h4 className="text-sm font-medium">{title}</h4>
			<p className="text-lg font-semibold">{value}</p>
		</div>
	</div>
);
