"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../../main.css'
import { isLoggedIn, getRole, setToken } from "../../utils/auth"
import Spinner from "../spinner/Spinner"

const ADMIN_ROLES = ["ADMIN", "ROLE_ADMIN"]

const AdminLogin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

    useEffect(() => {
        if (isLoggedIn()) {
            const role = getRole()
            if (ADMIN_ROLES.includes(role)) {
                navigate("/admin")
            } else {
                navigate("/")
            }
        }
    }, [navigate])

    const validateForm = () => {
        const errors = {}

        if (!username.trim()) {
            errors.username = "Username is required"
        } else if (username.trim().length < 3) {
            errors.username = "Username must be at least 3 characters"
        }

        if (!password) {
            errors.password = "Password is required"
        } else if (password.length < 3) {
            errors.password = "Password must be at least 3 characters"
        }

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        if (validationErrors.username) {
            setValidationErrors((prev) => ({ ...prev, username: "" }))
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (validationErrors.password) {
            setValidationErrors((prev) => ({ ...prev, password: "" }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (!validateForm()) {
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || `Authentication failed (${response.status})`)
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            if (!data.accessToken) {
                throw new Error("No authentication token received")
            }

            if (process.env.NODE_ENV !== "production") {
                console.log("Login Response:", data, "Time:", new Date().toISOString())
            }

            setToken(data.accessToken, data.role, data.username)

            const savedRole = getRole()
            console.log("Saved Role:", savedRole, "Time:", new Date().toISOString())

            if (!ADMIN_ROLES.includes(savedRole)) {
                throw new Error("Access denied. Admin privileges required.")
            }

            navigate("/admin", { replace: true })
        } catch (err) {
            console.error("Login error:", err, "Time:", new Date().toISOString())
            if (err.name === "TypeError" && err.message.includes("fetch")) {
                setError("Network error. Please check your connection and try again.")
            } else {
                setError(err.message || "Login failed. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-container">
            <div className="admin-login-wrapper">
                <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
                    <div className="admin-login-header">
                        <h1 className="admin-login-title">Fatayer Time</h1>
                        <h2 className="admin-login-subtitle">Admin Login</h2>
                    </div>

                    {error && (
                        <div className="admin-login-error" role="alert" aria-live="assertive">
                            <i className="bi bi-exclamation-triangle"></i>
                            {error}
                        </div>
                    )}

                    <div className="admin-login-fields">
                        <div className="admin-form-group">
                            <label htmlFor="username" className="admin-form-label">
                                Username
                            </label>
                            <input
                                id="username"
                                className={`admin-form-input ${validationErrors.username ? "error" : ""}`}
                                type="text"
                                value={username}
                                autoComplete="username"
                                onChange={handleUsernameChange}
                                disabled={loading}
                                required
                                aria-describedby={validationErrors.username ? "username-error" : undefined}
                                placeholder="Enter your username"
                            />
                            {validationErrors.username && (
                                <div id="username-error" className="admin-field-error" role="alert">
                                    {validationErrors.username}
                                </div>
                            )}
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="password" className="admin-form-label">
                                Password
                            </label>
                            <input
                                id="password"
                                className={`admin-form-input ${validationErrors.password ? "error" : ""}`}
                                type="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={handlePasswordChange}
                                disabled={loading}
                                required
                                aria-describedby={validationErrors.password ? "password-error" : undefined}
                                placeholder="Enter your password"
                            />
                            {validationErrors.password && (
                                <div id="password-error" className="admin-field-error" role="alert">
                                    {validationErrors.password}
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="admin-login-button" disabled={loading || !username.trim() || !password}>
                        {loading ? (
                            <>
                                <Spinner size="small" variant="secondary" />
                                <span>Logging in...</span>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-box-arrow-in-right"></i>
                                <span>Login</span>
                            </>
                        )}
                    </button>

                    <div className="admin-login-footer">
                        <a href="/" className="admin-back-link">
                            <i className="bi bi-arrow-left"></i>
                            Back to Website
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
