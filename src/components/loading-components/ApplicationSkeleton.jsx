export default function ApplicationSkeleton(){
    return(
        <>
            <div  className="skeleton-application" role="status" aria-label="Loading applications">
                <div className="primary-applicaton-info">
                    <div className="skeleton-line skeleton-label" />
                    <div className="skeleton-line skeleton-label" />
                    <div className="skeleton-line skeleton-label" />
                </div>
                <div className="secondary-applicaton-info">
                    <div className="skeleton-line skeleton-label" />
                    <div className="skeleton-line skeleton-label" />
                </div>
            </div>
            <div  className="skeleton-application">
                <div className="primary-applicaton-info">
                    <div className="skeleton-line skeleton-label" />
                    <div className="skeleton-line skeleton-label" />
                    <div className="skeleton-line skeleton-label" />
                </div>
                <div className="secondary-applicaton-info">
                    <div className="skeleton-line skeleton-label" />
                    <div className="skeleton-line skeleton-label" />
                </div>
            </div>
        </>
    )
}