import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApplicationList from "../components/application-components/ApplicationList";
import ApplicationReadModal from "../components/application-components/ApplicationReadModal";
import Filter from "../components/application-components/Filter";

const dummyApplications = [
  {
    id: "1",
    company: "Google",
    role: "Frontend Developer",
    status: "no_response",
    dateApplied: "2026-09-02",
    location: "Remote",
    jobUrl: "",
    notes: "",
  },
  {
    id: "2",
    company: "Stripe",
    role: "Frontend Engineer",
    status: "interviewing",
    dateApplied: "2026-08-28",
    location: "Bangalore",
    jobUrl: "",
    notes: "",
  },
  {
    id: "3",
    company: "Meta",
    role: "React Developer",
    status: "offer",
    dateApplied: "2026-08-15",
    location: "Remote",
    jobUrl: "",
    notes: "",
  },
  {
    id: "4",
    company: "Netflix",
    role: "UI Developer",
    status: "rejected",
    dateApplied: "2026-08-20",
    location: "Hyderabad",
    jobUrl: "",
    notes: "",
  },
];

export default function Applications() {
  const [searchParams,setSearchParams] = useSearchParams()
  const [applications, setApplications] = useState(dummyApplications)
  const [searchTerm, setSearchTerm] = useState("")

  const  filterStatus = searchParams.get("status") || "all"
  const appID = searchParams.get("id")
  const selectedApp = applications.find(app => app.id === appID) || null


  function handleCardClick(app) {
    searchParams.set("id", app.id)
    setSearchParams(searchParams)
  }

  function handleCloseModal() {
    searchParams.delete("id")
    setSearchParams(searchParams)
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
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase())

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
        <button className="add-btn">+ Add</button>
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
          onEdit={() => console.log("edit - later")}
          onDelete={() => console.log("delete - later")}
        />
      )}

    </div>
  );
}
