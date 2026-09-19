import { useState, useEffect } from "react"
import { db } from "../config/firebase"
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore"

export function useApplications(user) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  async function fetchApplications() {
    setLoading(true)
    setError(null)
    try {
      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid),
        orderBy("dateApplied", "desc")
      )
      const snapshot = await getDocs(q)

    // checks if this result came from local cache with zero documents —
    // meaning the request likely never reached the backend (e.g. offline),
    // which getDocs doesn't treat as a thrown error  
      if (snapshot.metadata.fromCache && snapshot.empty) {
        setError("You appear to be offline. Please check your connection and try again.")
        setApplications([])
      } else {
        const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setApplications(apps)
      }
    } catch (err) {
      console.error(err)
      setError("Couldn't load your applications. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchApplications()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleCreate = async (formData) => {
    const docRef = await addDoc(collection(db, "applications"), { ...formData, userId: user.uid })
    setApplications(prev => [...prev, { ...formData, id: docRef.id, userId: user.uid }])
  }

  const handleUpdate = async (id, formData) => {
    await updateDoc(doc(db, "applications", id), formData)
    setApplications(prev =>
      prev.map(app => app.id === id ? { ...app, ...formData } : app)
    )
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "applications", id))
    setApplications(prev => prev.filter(app => app.id !== id))
  }

  return { applications, loading, error, handleCreate, handleUpdate, handleDelete }
}