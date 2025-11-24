// layouts/AdminLayout.jsx
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 bg-gray-50 p-4">
				<Outlet />
			</main>
		</div>
	)
}

export default AdminLayout
