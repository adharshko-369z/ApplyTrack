import Badge from "../Badge"

export default function ApplicationReadModal({ application, onClose, onEdit, onDelete }) {
    const statusLabel = application.status.split("_").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
    const statusVariant = application.status.split("_").join("-")

    function handleDelete() {
        const confirmed = window.confirm(`Delete application for ${application.company}?`)
        if (confirmed) {
            onDelete(application.id)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{application.company}</h2>
                    <div className="modal-actions">
                        <button className="edit-btn" onClick={onEdit}>Edit</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <Badge variant={statusVariant}>{statusLabel}</Badge>
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