import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import ScrollToTop from "./components/ScrollToTop.jsx";

import { RequireAuth, RequireAdmin } from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";

import Services from "./pages/Services.jsx";

import ServiceDetail from "./pages/ServiceDetail.jsx";

import Login from "./pages/Login.jsx";

import Register from "./pages/Register.jsx";

import ForgotPassword from "./pages/ForgotPassword.jsx";

import ResetPassword from "./pages/ResetPassword.jsx";

import Dashboard from "./pages/Dashboard.jsx";

import NotFound from "./pages/NotFound.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";

import AdminServices from "./pages/admin/AdminServices.jsx";

import AdminServiceDetail from "./pages/admin/AdminServiceDetail.jsx";

import AdminCategories from "./pages/admin/AdminCategories.jsx";

import AdminOffices from "./pages/admin/AdminOffices.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/services" element={<Services />} />

          <Route path="/services/:slug" element={<ServiceDetail />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* User Protected Routes */}

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Admin Protected Routes */}

          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminServices />} />

              <Route path="services" element={<AdminServices />} />

              <Route path="services/:id" element={<AdminServiceDetail />} />

              <Route path="categories" element={<AdminCategories />} />

              <Route path="offices" element={<AdminOffices />} />
            </Route>
          </Route>

          {/* 404 */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
