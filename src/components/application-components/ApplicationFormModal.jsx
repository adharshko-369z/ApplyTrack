// components/application-components/ApplicationFormModal.jsx
import { useState } from "react"

export default function ApplicationFormModal({ application, mode, onCancel, onSave }) {
    const isEdit = mode === "edit"

    const [formData, setFormData] = useState({
        company: application?.company || "",
        role: application?.role || "",
        status: application?.status || "no_response",
        dateApplied: application?.dateApplied || "",
        location: application?.location || "",
        jobUrl: application?.jobUrl || "",
        notes: application?.notes || "",
    })

    function handleChange(field, value) {
        setFormData({ ...formData, [field]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const cleaned = {
            ...formData,
            company: formData.company.trim(),
            role: formData.role.trim(),
            location: formData.location.trim(),
        }

        if (!cleaned.company || !cleaned.role || !cleaned.location || !cleaned.dateApplied) {
            alert("Please fill in all required fields")
            return
        }

        await onSave(cleaned)
        onCancel()
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <form className="modal-content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <h2>{isEdit ? "Edit Application" : "Add Application"}</h2>

                <div className="form-field">
                    <label htmlFor="company">Company</label>
                    <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder="e.g. Google"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="role">Role</label>
                    <input
                        id="role"
                        type="text"
                        value={formData.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        placeholder="e.g. Frontend Developer"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                    >
                        <option value="no_response">No response</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="dateApplied">Date Applied</label>
                    <input
                        id="dateApplied"
                        type="date"
                        value={formData.dateApplied}
                        onChange={(e) => handleChange("dateApplied", e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="e.g. Remote, Bangalore"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="jobUrl">Job URL</label>
                    <input
                        id="jobUrl"
                        type="url"
                        value={formData.jobUrl}
                        onChange={(e) => handleChange("jobUrl", e.target.value)}
                        placeholder="https://company.com/careers/job-id"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        placeholder="Any notes — referral contact, interview prep, follow-up reminders..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit">{isEdit ? "Save changes" : "Add application"}</button>
                    <button className="modal-close-btn " type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}