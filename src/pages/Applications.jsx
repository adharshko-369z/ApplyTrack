import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApplicationList from "../components/application-components/ApplicationList";

const dummyApplications = [
  {
    id: "1",
    company: "Google",
    role: "Frontend Developer",
    status: "No Response",
    dateApplied: "2026-09-02",
    location: "Remote",
    jobUrl: "",
    notes: "",
  },
  {
    id: "2",
    company: "Stripe",
    role: "Frontend Engineer",
    status: "Interviewing",
    dateApplied: "2026-08-28",
    location: "Bangalore",
    jobUrl: "",
    notes: "",
  },
  {
    id: "3",
    company: "Meta",
    role: "React Developer",
    status: "Offer",
    dateApplied: "2026-08-15",
    location: "Remote",
    jobUrl: "",
    notes: "",
  },
  {
    id: "4",
    company: "Netflix",
    role: "UI Developer",
    status: "Rejected",
    dateApplied: "2026-08-20",
    location: "Hyderabad",
    jobUrl: "",
    notes: "",
  },
];

export default function Applications() {
  const [searchParams,setSearchParams] = useSearchParams()
  const [applications, setApplications] = useState(dummyApplications);
  const [isFilterCardOpen, setIsFilterCardOpen ] = useState(false)
  const filterOptions = [
  { value: "all", label: "All" },
  { value: "No Response", label: "No response" },
  { value: "Interviewing", label: "Interviewing" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

  const  filterStatus = searchParams.get("status") || "all"

  function handleFilterChange(newStatus) {
    if (newStatus === "all") {
      searchParams.delete("status"); 
      setSearchParams(searchParams);
    } else {
      setSearchParams({ status: newStatus });
    }
  }

  const filteredApplications = applications.filter((app) =>
    filterStatus === "all" ? true : app.status === filterStatus
  );

  return (
    <div className="applications-page">
      <div className="applications-toolbar">
        <div className="filter">
          <button className="filter-btn" onClick={()=> setIsFilterCardOpen(prev => !prev)}>Filter</button>
          {isFilterCardOpen && <div className="filter-card">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={filterStatus === option.value ? "filter-option filter-active" : "filter-option"}
                onClick={() => {
                  handleFilterChange(option.value);
                  setIsFilterCardOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>}
        </div>

        <input type="text" placeholder="Search applications..." />
        <button className="add-btn">+ Add</button>
      </div>

      <ApplicationList
        applications={filteredApplications}
      />

    </div>
  );
}
