// pages/NotFound.jsx
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>Page not found</p>
      <p className="notfound-subtext">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link className="route-links-to-btns" to="/dashboard">
        Back to Dashboard
      </Link>
    </div>
  )
}