import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/store/Home';
import Verify from '../pages/auth/Verify';
import Products from '../pages/store/Products';
import ProductDetails from '../pages/store/ProductDetails';
import Cart from '../pages/store/cart';
// import About from '../pages/About';
// import Contact from '../pages/Contact';

import Dashboard from '../pages/admin/Dashboard';
import AdminLayout from '../components/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import { routes } from './route';

const AppRouter = () => {
  return (
    <Routes>

        {/* 🔓 Public Routes */}
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.verify} element={<Verify />} />
        <Route path={routes.register} element={<Register />} /> 
        <Route path={routes.Home} element={<Home />} />
        <Route path={routes.product} element={<Products />} />
        <Route path={routes.productDetails} element={<ProductDetails />} />
        <Route path={routes.cart} element={<Cart />} />


        {/* 🔐 Protected User Route */}
        <Route
            path={routes.Home}
            element={
            <ProtectedRoute>
                <RoleRoute allowedRoles={['user']}>
                {/* <Home /> */}
                </RoleRoute>
            </ProtectedRoute>
            }
        />

        {/* 🔐 Protected Admin Route */}
        <Route
            path="/admin/dashboard"
            element={
            <ProtectedRoute>
                <RoleRoute allowedRoles={['admin']}>
                <AdminLayout />
                </RoleRoute>
            </ProtectedRoute>
            }
        />
        {/* 🔁 Fallback - redirect unknown routes */}

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default AppRouter;
