import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useAuthForm } from "../hooks/useAuthForm"
import { useClickOutside } from "../hooks/useClickOutside"
import profilePlaceholder from "../assets/profile-placeholder.svg"

export default function Profile() {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const { handleLogout } = useAuthForm()
    const profileRef = useClickOutside(() => setIsOpen(false))

    const fallbackLetter = user?.email?.charAt(0).toUpperCase()

    return (
        <div className="profile" ref={profileRef}>
            <button className="profile-btn" onClick={() => setIsOpen(prev => !prev)}>
                {user?.photoURL ? (
                    <img className="profile-image" src={user.photoURL} alt="profile" />
                ) : user ? (
                    <span>{fallbackLetter}</span>
                ) : !user && (
                    <img className="profile-image" src={profilePlaceholder} alt="profile placeholder" />
                )}
            </button>

            {isOpen && (
                <div className="profile-card">
                    {user?.photoURL ? (
                        <img className="profile-image" src={user.photoURL} alt="profile" />
                    ) : user ? (
                        <span className="profile-image" >{fallbackLetter}</span>
                    ) : !user && (
                        <img className="profile-image" src={profilePlaceholder} alt="profile placeholder" />
                    )}
                    <p>{user?.email}</p>
                    {user ? (
                        <button onClick={() => handleLogout() && setIsOpen(false)}>Sign out</button>
                    ) : (
                        <Link className="profile-nav" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </div>
    )
}

