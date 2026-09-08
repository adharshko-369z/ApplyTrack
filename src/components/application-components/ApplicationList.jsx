import Badge from "../Badge"

export default function ApplicationList({ applications}){
    const appList = applications.map(application => {
        return(
            <div key={application.id} className="application">
                <div className="primary-applicaton-info">
                    <p>{application.company}</p>
                    <p className="application-role">{application.role}</p>
                    <p className="application-location">{application.location}</p>
                </div>
                <div className="secondary-applicaton-info">
                    <Badge variant={application.status}>{application.status}</Badge>
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