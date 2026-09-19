import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApplicationList from "../components/application-components/ApplicationList";
import ApplicationReadModal from "../components/application-components/ApplicationReadModal";
import ApplicationFormModal from "../components/application-components/ApplicationFormModal";
import Filter from "../components/application-components/Filter";
import ApplicationSkeleton from "../components/loading-components/ApplicationSkeleton";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore"



export default function Applications() {
  const [searchParams,setSearchParams] = useSearchParams()
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [modalMode, setModalMode] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)
  const [error, setError] = useState(null)
  
  const  filterStatus = searchParams.get("status") || "all"
  const appID = searchParams.get("id")
  const selectedApp = applications.find(app => app.id === appID) || null
  
  useEffect(() => {
    async function fetchApplications() {
      setLoading(true)
      setError(null)
      try{
        const q = query(
          collection(db, "applications"),
          where("userId", "==", user.uid),
          orderBy("dateApplied","desc")
        ) 
        
        const snapshot = await getDocs(q)
        // checks if this result came from local cache with zero documents —
        // meaning the request likely never reached the backend (e.g. offline),
        // which getDocs doesn't treat as a thrown error  
        if(snapshot.metadata.fromCache && snapshot.empty){
          setError("You appear to be offline. Please check your connection and try again.")
          setApplications([])
        }else{
          const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setApplications(apps)
        } 
      }catch (err){
        console.error(err)
        setError("Couldn't load your applications. Check your connection and try again.")
      }finally{
        setLoading(false)
      }
    }
    
    if (user) { 
      fetchApplications()
    }
  }, [user])

  useEffect(() => {
    if (searchParams.get("add") === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing modal state with URL param on mount, intentional
      setModalMode("create")
      searchParams.delete("add")
      setSearchParams(searchParams)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
  
  function handleCardClick(app) {
    searchParams.set("id", app.id)
    setSearchParams(searchParams)
    setModalMode("read")
  }
  
  function handleEditClick() {
    setModalMode("edit")
  }
  
  function handleAddClick() {
    setModalMode("create")
  }
  
  function handleCloseModal() {
    searchParams.delete("id")
    setSearchParams(searchParams)
    setModalMode(null)
  }

  // firebase-cruds

  const handleCreate = async (formData) => {
    const docRef = await addDoc(collection(db, 'applications'), {...formData, userId : user.uid})
    setApplications(prev => [...prev, { ...formData , id: docRef.id, userId : user.uid }])
  }

  const handleUpdate = async (id, formData) => {
    await updateDoc(doc(db, 'applications', id), formData)
    setApplications(prev =>
      prev.map(app => app.id === id ? { ...app, ...formData } : app)
    )
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'applications', id))
    setApplications(prev => prev.filter(app => app.id !== id))
  }
  
  function handleFilterChange(newStatus) {
    if (newStatus === "all") {
      searchParams.delete("status")
      setSearchParams(searchParams)
    } else {
      setSearchParams({ status: newStatus })
    }
  }
  
  const displayedApplications = applications.filter(app =>{
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    const matchesSearch =
    app.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.location?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesSearch
  }
)

function highlightMatch(text, searchTerm) {
  if (!searchTerm.trim()) return text
  
  const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escaped})`, "gi")
  const parts = text.split(regex)
  
  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
}

return (
  <div className="applications-page">
      <div className="applications-toolbar">
        <Filter filterStatus={filterStatus} handleFilterChange={handleFilterChange}/>
        <input type="text" placeholder="Search applications..." value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} />
        <button className="add-btn" onClick={handleAddClick}>Add</button>
      </div>

      { loading ? (
        <ApplicationSkeleton />
        )
        :error ? (
          <div className="applications-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )
        :applications.length === 0 ? (
          <div className="applications-empty">
              <p className="applications-empty-title">No applications yet</p>
              <p className="applications-empty-subtext">
                Click "Add" above to start tracking your job applications.
              </p>
          </div>
        )
        :(
        <ApplicationList
        applications={displayedApplications}
        highlightMatch={highlightMatch}
        searchTerm = {searchTerm}
        onCardClick = {handleCardClick}
        />
      )}

      {selectedApp && (
        <ApplicationReadModal
        application={selectedApp}
        onClose={handleCloseModal}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        />
      )}

      {(modalMode === "edit" || modalMode === "create") && (
        <ApplicationFormModal
        application={selectedApp}
        mode={modalMode}
        onCancel={handleCloseModal}
        onSave={modalMode === "edit" ? (formData) => handleUpdate(selectedApp.id, formData) : handleCreate}
        />
      )}

    </div>
  );
}
