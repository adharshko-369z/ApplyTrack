import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';


export default function AuthLayout() {

  const {user, checking} = useContext(AuthContext)
  console.log(user.photoURL)

  if (checking) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

