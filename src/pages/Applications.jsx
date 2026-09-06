import { useState } from "react";
import ApplicationList from "../components/application-components/ApplicationList";
// import ApplicationModal from "../../components/ApplicationModal";

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
  const [applications, setApplications] = useState(dummyApplications);
  const [selectedApp, setSelectedApp] = useState(null);
  // null = modal closed
  // {} = add mode (new empty application)
  // {...app} = edit mode

  function handleCardClick(app) {
    setSelectedApp(app);
  }

  function handleAddClick() {
    setSelectedApp({});
  }

  function handleClose() {
    setSelectedApp(null);
  }

  function handleSave(formData) {
    if (formData.id) {
      // edit existing
      setApplications((prev) =>
        prev.map((app) => (app.id === formData.id ? formData : app))
      );
    } else {
      // create new
      const newApp = { ...formData, id: Date.now().toString() };
      setApplications((prev) => [...prev, newApp]);
    }
    setSelectedApp(null);
  }

  function handleDelete(id) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    setSelectedApp(null);
  }

  return (
    <div className="applications-page">
      <div className="applications-toolbar">
        <input type="text" placeholder="Search applications..." />
        <button onClick={handleAddClick}>+</button>
      </div>

      <ApplicationList
        applications={applications}
        onCardClick={handleCardClick}
      />

      {/* {selectedApp && (
        <ApplicationModal
          application={selectedApp}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )} */}
    </div>
  );
}