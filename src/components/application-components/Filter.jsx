import { useState } from "react";
import { STATUSES } from "../../constants/applicationStatus";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function Filter({ filterStatus, handleFilterChange, counts }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useClickOutside(() => setIsOpen(false))

  const availableOptions = [
    { value: "all", label: "All" },
    ...STATUSES.filter(s => counts[s.value] > 0),
  ]

  return (
    <div className="filter">
      <button className="filter-btn" onClick={() => setIsOpen((prev) => !prev)}>
        Filter
      </button>
      {isOpen && (
        <div className="filter-card" ref={filterRef}>
          {availableOptions.map((option) => (
            <button
              key={option.value}
              className={filterStatus === option.value ? "filter-option filter-active" : "filter-option"}
              onClick={() => {
                handleFilterChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}