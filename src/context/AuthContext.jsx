import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setChecking(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, checking }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext }