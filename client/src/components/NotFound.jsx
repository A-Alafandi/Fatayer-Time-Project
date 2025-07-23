import { Link } from "react-router-dom"
import "../main.css"

function NotFound() {
    return (
        <div className="not-found-page">
            <div className="container text-center py-5">
                <div className="py-5">
                    <h1 className="display-1 fw-bold mb-0">404</h1>
                    <h2 className="mb-3" style={{ fontWeight: 700 }}>
                        Page Not Found
                    </h2>
                    <p className="mb-4">
                        Oops! The page you are looking for does not exist or has been moved.
                        <br />
                        Try going back to the{" "}
                        <Link to="/" className="fw-semibold" style={{ color: "var(--accent-color)" }}>
                            home page
                        </Link>
                        .
                    </p>
                    <Link to="/" className="btn btn-primary px-5 py-2 mt-3">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
