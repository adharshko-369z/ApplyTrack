import { useState } from "react"
import { STATUSES } from "../../constants/applicationStatus"
import { useModalA11y } from "../../hooks/useModalA11y"

export default function ApplicationFormModal({ application, mode, onCancel, onSave }) {
    const [errors, setErrors] = useState({})
    const isEdit = mode === "edit"
    useModalA11y(onCancel)

    const [formData, setFormData] = useState({
        company: application?.company || "",
        role: application?.role || "",
        status: application?.status || "no-response",
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

        const newErrors = {}
        if (!cleaned.company) newErrors.company = "Company is required"
        if (!cleaned.role) newErrors.role = "Role is required"
        if (!cleaned.location) newErrors.location = "Location is required"
        if (!cleaned.dateApplied) newErrors.dateApplied = "Date applied is required"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        await onSave(cleaned)
        onCancel()
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content modal-content-form">
                <form  
                    className="modal-scroll-inner"
                    onClick={(e) => e.stopPropagation()} 
                    onSubmit={handleSubmit}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <h2 id="modal-title" >{isEdit ? "Edit Application" : "Add Application"}</h2>

                    <div className="form-field">
                        <label htmlFor="company">Company</label>
                        <input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="e.g. Google"
                            required
                            aria-invalid={errors.company ? "true" : "false"}
                            aria-describedby={errors.company ? "company-error" : undefined}
                        />
                        {errors?.company && (
                            <p id="company-error" className="field-error" role="alert">
                                {errors.company}
                            </p>
                        )}  
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
                            aria-invalid={errors.role ? "true" : "false"}
                            aria-describedby={errors.role ? "role-error" : undefined}
                        />
                        {errors?.role && (
                            <p id="role-error" className="field-error" role="alert">
                                {errors.role}
                            </p>
                        )}  
                    </div>

                    <div className="form-field">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                        >
                            {STATUSES.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
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
                            aria-invalid={errors.dateApplied ? "true" : "false"}
                            aria-describedby={errors.dateApplied ? "dateApplied-error" : undefined}
                        />
                        {errors?.dateApplied && (
                            <p id="dateApplied-error" className="field-error" role="alert">
                                {errors.dateApplied}
                            </p>
                        )}
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
                            aria-invalid={errors.location ? "true" : "false"}
                            aria-describedby={errors.location ? "location-error" : undefined}
                        />
                        {errors?.location && (
                            <p id="location-error" className="field-error" role="alert">
                                {errors.location}
                            </p>
                        )}
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
                        <button className="route-links-to-btns" type="submit">{isEdit ? "Save changes" : "Add application"}</button>
                        <button className="modal-close-btn " type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}