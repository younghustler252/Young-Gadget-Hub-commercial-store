import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiBox, FiUsers, FiList, FiMenu, FiLogOut, FiBell, FiPackage, FiClipboard } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [collapsed, setCollapsed] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	// Define the links for the sidebar
	const links = [
		{ to: "/admin/dashboard", label: "Dashboard", icon: <FiHome /> },
		{ to: "/admin/products", label: "Products", icon: <FiBox /> },
		{ to: "/admin/orders", label: "Orders", icon: <FiList /> },
		{ to: "/admin/users", label: "Users", icon: <FiUsers /> },  // Users section
		{ to: "/admin/notifications", label: "Notifications", icon: <FiBell /> },  // Notifications section
		{ to: "/admin/packages", label: "Packages", icon: <FiPackage /> },  // New Link for Packages
		{ to: "/admin/reports", label: "Reports", icon: <FiClipboard /> },  // New Link for Reports
	];

	return (
		<aside
			className={`bg-gray-900 text-white h-screen sticky top-0 flex flex-col transition-all duration-300 ${
				collapsed ? "w-16" : "w-64"
			}`}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
				<span className={`text-lg font-bold ${collapsed ? "hidden" : "block"}`}>Admin</span>
				<button
					onClick={() => setCollapsed(!collapsed)}
					className="text-gray-400 hover:text-white"
				>
					<FiMenu />
				</button>
			</div>

			{/* Navigation Links */}
			<nav className="flex-1 px-2 py-4 space-y-2">
				{links.map((link) => (
					<Link
						key={link.to}
						to={link.to}
						className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-700 transition ${
							location.pathname === link.to ? "bg-gray-800" : ""
						}`}
					>
						<span className="text-lg">{link.icon}</span>
						<span className={`ml-3 text-sm ${collapsed ? "hidden" : "inline"}`}>
							{link.label}
						</span>
					</Link>
				))}
			</nav>

			{/* Logout Button */}
			<div className="px-3 py-4 border-t border-gray-700">
				<button
					onClick={handleLogout}
					className="flex items-center text-sm text-red-400 hover:text-red-500 w-full"
				>
					<FiLogOut className="text-lg" />
					<span className={`ml-3 ${collapsed ? "hidden" : "inline"}`}>Logout</span>
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
