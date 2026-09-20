import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Outlet, Navigate, NavLink } from 'react-router-dom'


export default function AuthLayout() {

  const {user, checking} = useContext(AuthContext)

  if (checking) {
  return (
    <div className="auth-checking">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  )
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
        {({ isActive }) => <span aria-current={isActive ? "page" : undefined}>Dashboard</span>}
      </NavLink>
      <NavLink 
        to="/applications"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
      >
        {({ isActive }) => <span aria-current={isActive ? "page" : undefined}>Applications</span>}
      </NavLink>
    </nav>
    <Outlet />
   </> 
)
}

