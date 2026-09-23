import  applyTrackLogo  from "../assets/applytrack-logo.svg"
import Profile from "./Profile"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { NavLink } from "react-router-dom"

export default function Header(){

    const { user } = useContext(AuthContext)

    return(
        <>
        <div className="header-wrapper">
            <header className="header page-container">
                <div className="logo">
                    <img src={applyTrackLogo} alt="" width="40" />
                    <span>ApplyTrack</span>
                </div>
                {user && (
                    <nav className="header-nav">
                        <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/applications" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                            Applications
                        </NavLink>
                    </nav>
                )}
                <Profile />
            </header>
        </div>
        </>
    )
}