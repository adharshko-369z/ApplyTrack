import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApplicationList from "../components/application-components/ApplicationList";
import ApplicationReadModal from "../components/application-components/ApplicationReadModal";
import ApplicationFormModal from "../components/application-components/ApplicationFormModal";
import Filter from "../components/application-components/Filter";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore"



export default function Applications() {
  const [searchParams,setSearchParams] = useSearchParams()
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [modalMode, setModalMode] = useState(null)
  const { user } = useContext(AuthContext)
  
  const  filterStatus = searchParams.get("status") || "all"
  const appID = searchParams.get("id")
  const selectedApp = applications.find(app => app.id === appID) || null
  
  useEffect(() => {
    async function fetchApplications() {
      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid),
        orderBy("dateApplied","desc")
      ) 
      
      const snapshot = await getDocs(q)
      
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      setApplications(apps)
    }
    
    if (user) {
      fetchApplications()
    }
  }, [user])
  
  
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

      <ApplicationList
        applications={displayedApplications}
        highlightMatch={highlightMatch}
        searchTerm = {searchTerm}
        onCardClick = {handleCardClick}
        />

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
