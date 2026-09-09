import Badge from "../Badge"

export default function ApplicationList({ applications, highlightMatch, searchTerm}){

    if (applications.length === 0) {
        return (
            <div className="no-results">
            {searchTerm && <p>No results for "{searchTerm}"</p>}
            </div>
        )
    }


    const appList = applications.map(application => {

        const statusLabel = application.status.split("_").map(word => word[0].toUpperCase()+word.slice(1)).join(" ")
        const statusVariant = application.status.split("_").join("-")

        return(
            <div key={application.id} className="application">
                <div className="primary-applicaton-info">
                    <p>{highlightMatch(application.company, searchTerm)}</p>
                    <p className="application-role">{highlightMatch(application.role, searchTerm)}</p>
                    <p className="application-location">{highlightMatch(application.location, searchTerm)}</p>
                </div>
                <div className="secondary-applicaton-info">
                    <Badge variant={statusVariant}>{statusLabel}</Badge>
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