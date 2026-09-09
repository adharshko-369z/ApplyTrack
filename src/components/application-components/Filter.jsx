
import { useState } from "react";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "no_response", label: "No response" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

export default function Filter({ filterStatus, handleFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter">
      <button className="filter-btn" onClick={() => setIsOpen((prev) => !prev)}>
        Filter
      </button>
      {isOpen && (
        <div className="filter-card">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={filterStatus === option.value ? "filter-option filter-active" : "filter-option"}
              onClick={() => {
                handleFilterChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}