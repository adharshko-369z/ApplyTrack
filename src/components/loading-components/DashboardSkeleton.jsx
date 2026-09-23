export default function DashboardSkeleton() {
  return (
    <>
      <div className="dashboard-main-analysis skeleton-analysis" role="status" aria-label="Loading dashboard">
        <div className="skeleton-line skeleton-stat" />
        <div className="skeleton-line skeleton-stat" />
        <div className="skeleton-line skeleton-stat" />
      </div>

      <div className="status-cards">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="status-card skeleton-card">
            <div className="skeleton-line skeleton-number" />
            <div className="skeleton-line skeleton-label" />
            <div className="skeleton-line skeleton-link" />
          </div>
        ))}
      </div>
    </>
  )
}