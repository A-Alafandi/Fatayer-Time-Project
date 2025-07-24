"use client"

import { useState, useRef, useEffect } from "react"
import '../../main.css'
import Spinner from "../spinner/Spinner"
import Notification from "../Notification"
import AdminNavbar from "./AdminNavbar"
import { adminService } from "../service/adminService"

function AdminSettings() {
    const [form, setForm] = useState({
        currentPassword: "",
        newUsername: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState("")
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState(null)
    const usernameInput = useRef()

    useEffect(() => {
        usernameInput.current?.focus()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
        setErrors((errs) => ({ ...errs, [name]: undefined }))
        setGeneralError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = adminService.validateCredentialsForm(form)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        setGeneralError("")

        try {
            await adminService.updateAdminCredentials({
                currentPassword: form.currentPassword,
                newUsername: form.newUsername,
                newPassword: form.newPassword || undefined,
            })

            setNotification({ message: "Profile updated successfully!", type: "success" })
            setForm({
                currentPassword: "",
                newUsername: "",
                newPassword: "",
                confirmPassword: "",
            })
        } catch (err) {
            setGeneralError(err.message || "Update failed.")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        // Add logout logic here
        window.location.href = "/admin-login"
    }

    return (
        <div className="admin-dashboard">
            <AdminNavbar onLogout={handleLogout} />
            <main className="settings-root">
                <h2 className="settings-title">Update Admin Credentials</h2>
                <form className="settings-form" onSubmit={handleSubmit} autoComplete="off" aria-labelledby="settings-title">
                    <div className="form-group">
                        <label htmlFor="currentPassword">
                            Current Password
                            <span aria-hidden="true" style={{ color: "var(--accent-color)" }}>
                *
              </span>
                        </label>
                        <input
                            ref={usernameInput}
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={form.currentPassword}
                            onChange={handleChange}
                            disabled={loading}
                            aria-required="true"
                            className={errors.currentPassword ? "input-error" : ""}
                        />
                        {errors.currentPassword && (
                            <div className="field-error" role="alert">
                                {errors.currentPassword}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="newUsername">
                            New Username
                            <span aria-hidden="true" style={{ color: "var(--accent-color)" }}>
                *
              </span>
                        </label>
                        <input
                            id="newUsername"
                            name="newUsername"
                            type="text"
                            value={form.newUsername}
                            onChange={handleChange}
                            disabled={loading}
                            aria-required="true"
                            className={errors.newUsername ? "input-error" : ""}
                        />
                        {errors.newUsername && (
                            <div className="field-error" role="alert">
                                {errors.newUsername}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">
                            New Password{" "}
                            <span style={{ color: "color-mix(in srgb, var(--default-color), transparent 40%)", fontSize: "0.95em" }}>
                (optional)
              </span>
                        </label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={form.newPassword}
                            onChange={handleChange}
                            disabled={loading}
                            aria-required="false"
                            className={errors.newPassword ? "input-error" : ""}
                        />
                        {errors.newPassword && (
                            <div className="field-error" role="alert">
                                {errors.newPassword}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            disabled={loading || !form.newPassword}
                            aria-required="false"
                            className={errors.confirmPassword ? "input-error" : ""}
                        />
                        {errors.confirmPassword && (
                            <div className="field-error" role="alert">
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>
                    {generalError && (
                        <div className="general-error" role="alert">
                            {generalError}
                        </div>
                    )}
                    <div className="button-row">
                        <button type="submit" disabled={loading} className="save-button">
                            {loading ? <Spinner size="small" /> : "Save Changes"}
                        </button>
                    </div>
                </form>
                {notification && (
                    <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
                )}
            </main>
        </div>
    )
}

export default AdminSettings
