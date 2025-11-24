// layouts/UserLayout.jsx
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
	return (
		<div>
			<Header />
			<main style={{ padding: "20px" }}>
				<Outlet />
			</main>
		</div>
	)
}

export default UserLayout
