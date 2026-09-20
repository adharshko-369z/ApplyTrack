import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApplicationList from "../components/application-components/ApplicationList";
import ApplicationReadModal from "../components/application-components/ApplicationReadModal";
import ApplicationFormModal from "../components/application-components/ApplicationFormModal";
import Filter from "../components/application-components/Filter";
import ApplicationSkeleton from "../components/loading-components/ApplicationSkeleton";
import { AuthContext } from "../context/AuthContext";
import { highlightMatch } from "../utils/highlightMatch";
import { useApplications } from "../hooks/useApplications";


export default function Applications() {
  const [searchParams,setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [modalMode, setModalMode] = useState(null)
  const { user } = useContext(AuthContext)

  const { applications, loading, error, handleCreate, handleUpdate, handleDelete } = useApplications(user)
  
  const  filterStatus = searchParams.get("status") || "all"
  const appID = searchParams.get("id")
  const selectedApp = applications.find(app => app.id === appID) || null
  const isModalOpen = Boolean(selectedApp) || modalMode === "edit" || modalMode === "create"
  
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


return (
  
  <div className="applications-page">
      <div inert={isModalOpen}>
        <div className="applications-toolbar">
          <Filter filterStatus={filterStatus} handleFilterChange={handleFilterChange}/>
          <input type="text" placeholder="Search applications..." value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} />
          <button className="add-btn" onClick={handleAddClick}>Add</button>
        </div>

        { loading ? (
          <ApplicationSkeleton />
          )
          :error ? (
            <div className="applications-error"  role="alert">
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
      </div>
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
