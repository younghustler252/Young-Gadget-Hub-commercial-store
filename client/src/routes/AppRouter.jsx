// routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Verify from "../pages/auth/Verify"

import Home from "../pages/store/Home"
import Products from "../pages/store/Products"
import ProductDetails from "../pages/store/ProductDetails"
import Cart from "../pages/store/cart"

import Dashboard from "../pages/admin/Dashboard"
import AdminProducts from "../pages/admin/Product"

import ProtectedRoute from "./ProtectedRoute"
import RoleRoute from "./RoleRoute"

import AdminLayout from "../layout/AdminLayout"
import UserLayout from "../layout/UserLayout"

import { routes } from "./route"

const AppRouter = () => {
	return (
		<Routes>
			<Route element={<UserLayout />}>
				{/* 🔓 Public Store Routes */}
				<Route path={routes.Home} element={<Home />} />
				<Route path={routes.product} element={<Products />} />
				<Route path={routes.productDetails} element={<ProductDetails />} />
				<Route path={routes.cart} element={<Cart />} />

				{/* 🔓 Auth Routes */}
				<Route path={routes.login} element={<Login />} />
				<Route path={routes.register} element={<Register />} />
				<Route path={routes.verify} element={<Verify />} />
			</Route>

			{/* 🔐 Protected User Area */}
			<Route element={<ProtectedRoute><RoleRoute allowedRoles={['user']} /></ProtectedRoute>}>
				<Route element={<UserLayout />}>
					<Route path="/profile" element={<h1>User Profile</h1>} />
					<Route path="/orders" element={<h1>Order History</h1>} />
				</Route>
			</Route>

			{/* 🔐 Protected Admin Area */}
			<Route element={<ProtectedRoute><RoleRoute allowedRoles={['admin']} /></ProtectedRoute>}>
				<Route element={<AdminLayout />}>
					<Route path="/admin/dashboard" element={<Dashboard />} />
          			<Route path="/admin/products" element={<AdminProducts />} />
				</Route>
			</Route>

			{/* ❌ Catch-All Redirect */}
			<Route path="*" element={<Navigate to={routes.Home} replace />} />
		</Routes>
	)
}

export default AppRouter
