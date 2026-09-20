import Badge from "../Badge"
import { useModalA11y } from "../../hooks/useModalA11y"
import { STATUSES } from "../../constants/applicationStatus"

export default function ApplicationReadModal({ application, onClose, onEdit, onDelete }) {
    const statusMeta = STATUSES.find(s => s.value === application.status)

    useModalA11y(onClose)

    function handleDelete() {
        const confirmed = window.confirm(`Delete application for ${application.company}?`)
        if (confirmed) {
            onDelete(application.id)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" 
                 onClick={(e) => e.stopPropagation()}
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="modal-title"
            >
                <div className="modal-header">
                    <h2 id="modal-title">{application.company}</h2>
                    <div className="modal-actions">
                        <button className="edit-btn" onClick={onEdit}>Edit</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <Badge variant={statusMeta?.value}>{statusMeta?.label}</Badge>
                <p>{`Role: ${application.role}`}</p>
                <p>{`Location: ${application.location}`}</p>
                <p>{`Applied Date: ${application.dateApplied}`}</p>
                {application.jobUrl && (
                    <a href={application.jobUrl} target="_blank" rel="noreferrer">View job posting</a>
                )}
                <p>{application.notes}</p>

                <button className="modal-close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}