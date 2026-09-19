import Badge from "../Badge"
import { STATUSES } from "../../constants/applicationStatus"

export default function ApplicationList({ applications, highlightMatch, searchTerm, onCardClick}){

    if (applications.length === 0) {
        return (
            <div className="no-results">
            {searchTerm && <p>No results for "{searchTerm}"</p>}
            </div>
        )
    }


    const appList = applications.map(application => {

        const statusMeta = STATUSES.find(s => s.value === application.status)
        
        return(
            <div key={application.id} className="application" onClick={() => onCardClick(application)}>
                <div className="primary-applicaton-info">
                    <p>{highlightMatch(application.company, searchTerm)}</p>
                    <p className="application-role">{highlightMatch(application.role, searchTerm)}</p>
                    <p className="application-location">{highlightMatch(application.location, searchTerm)}</p>
                </div>
                <div className="secondary-applicaton-info">
                    <Badge variant={statusMeta?.value}>{statusMeta?.label}</Badge>
                    <p className="application-date">{application.dateApplied}</p>
                </div>
            </div>
        )
    })
    return (
        <div className="applications">
            {appList}
        </div>
    )
}