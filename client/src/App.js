import { useEffect, Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Spinner from "./components/spinner/Spinner"
import { isTokenValid } from "./utils/auth"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import './main.css'
import AOS from "aos"
import "aos/dist/aos.css"

// Lazy load components
const HomePage = lazy(() => import("./components/HomePage"))
const MenuPage = lazy(() => import("./components/Menu/MenuPage"))
const AdminLogin = lazy(() => import("./components/Login/AdminLogin"))
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"))
const AdminSettings = lazy(() => import("./components/Admin/AdminSettings"))
const NotFound = lazy(() => import("./components/NotFound"))

function ProtectedRoute({ children }) {
    return isTokenValid() ? children : <Navigate to="/admin-login" replace />
}

// Error boundary component
function ErrorBoundary({ children }) {
    return children
}

export default function App() {
    useEffect(() => {
        AOS.init({ once: true, duration: 700 })
    }, [])

    return (
        <ErrorBoundary>
            <Suspense fallback={<Spinner size="large" />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/settings"
                        element={
                            <ProtectedRoute>
                                <AdminSettings />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    )
}
