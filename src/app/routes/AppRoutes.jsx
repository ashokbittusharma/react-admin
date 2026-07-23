import { lazy, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import LoginPage from "../../features/auth/pages/LoginPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage"

import ProtectedRoute from "./ProtectedRoute"
import AdminLayout from "../layouts/AdminLayout";

const CategoryListPage = lazy(() => import("../../pages/categories/CategoryListPage"));
const BrandListPage = lazy(() => import("../../pages/brands/BrandListPage"));
const UserListPage = lazy(() => import("../../pages/users/UserListPage"));

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <DashboardPage />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/categories"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Suspense fallback={<p>Loading...</p>}>
                                <CategoryListPage />
                            </Suspense>
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/brands"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Suspense fallback={<p>Loading...</p>}>
                                <BrandListPage />
                            </Suspense>
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route path="/users" element={<ProtectedRoute><AdminLayout><Suspense fallback={<p>Loading...</p>}><UserListPage /></Suspense></AdminLayout></ProtectedRoute>} />
            <Route path="/users/:role" element={<ProtectedRoute><AdminLayout><Suspense fallback={<p>Loading...</p>}><UserListPage /></Suspense></AdminLayout></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
