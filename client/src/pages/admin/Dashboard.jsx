import { useEffect, useState } from 'react';
import { getAllUsers, } from '../../services/userService';
import { getProducts } from '../../services/productService';


const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const productsResponse = await getProducts();
        const usersResponse = await getAllUsers();
        // const ordersResponse = await fetchOrders();

        setProductCount(productsResponse.data.length);
        setUserCount(usersResponse.data.length);
        // setOrderCount(ordersResponse.data.length);

        // Assuming orders are sorted by date descending, or we sort here:
        const sortedOrders = ordersResponse.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentOrders(sortedOrders.slice(0, 5)); // last 5 orders

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">{productCount}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-green-600">{userCount}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-red-600">{orderCount}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Order ID</th>
                <th className="border-b px-4 py-2">User</th>
                <th className="border-b px-4 py-2">Total Amount</th>
                <th className="border-b px-4 py-2">Status</th>
                <th className="border-b px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="border-b px-4 py-2">{order._id.slice(-6)}</td>
                  <td className="border-b px-4 py-2">{order.user?.name || order.user?.email || 'N/A'}</td>
                  <td className="border-b px-4 py-2">₦{order.total.toLocaleString()}</td>
                  <td className="border-b px-4 py-2 capitalize">{order.status}</td>
                  <td className="border-b px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
