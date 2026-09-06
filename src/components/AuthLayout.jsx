import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Outlet, Navigate, NavLink } from 'react-router-dom'


export default function AuthLayout() {

  const {user, checking} = useContext(AuthContext)

  if (checking) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
   <>
    <nav className='sub-nav'>
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        end
      >
        Dashboard
      </NavLink>
      <NavLink 
        to="/applications"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
      >
        Applications
      </NavLink>
    </nav>
    <Outlet />
   </> 
)
}

