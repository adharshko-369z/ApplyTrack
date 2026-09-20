import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import DashboardSkeleton from "../components/loading-components/DashboardSkeleton"
import { STATUSES } from "../constants/applicationStatus"
import { useApplications } from "../hooks/useApplications"
import { renderResponseRate, renderProgressionRate } from "../utils/dashboardStats"

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const { applications, loading, error } = useApplications(user)

  const counts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {})

  const total = applications.length

  return (
    <section className="dashboard-page">
      { loading ?(
        <DashboardSkeleton />
      )
      :error ? (
          <div className="applications-error" role="alert">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
      ) 
      : total === 0 ?
      (
        <div className="dashboard-empty">
          <p className="dashboard-empty-title">No applications yet</p>
          <p className="dashboard-empty-subtext">
            Start tracking your job search by adding your first application.
          </p>
          <Link to="/applications?add=true" className="dashboard-empty-cta">
            Add your first application
          </Link>
        </div>
      )
      :(
        <>
        <div className="dashboard-main-analysis">
          <p>Total applications: <span className="total">{total}</span></p>
          <p>Response rate: <span className="total">{`${renderResponseRate(counts,total)}%`}</span></p>
          <p>Progression rate: <span className="total">{`${renderProgressionRate(counts,total)}%`}</span></p>
        </div>

        <div className="status-cards">
          {STATUSES.map(({value, label}) => (
              <div key={value} className={`status-card ${value}-card`}>
              <p className="status-count">{counts[value] || 0}</p>
              <p className="status-label">{label}</p>
              {counts[value] > 0 ? (
                <Link to={`/applications?status=${value}`} className="status-link">
                  Explore applications 
                  </Link>
                ) : (
                  <span className="status-link disabled">No applications yet</span>
                )}
              </div>
          ))}
      </div>
     </>
      )}
    </section>
  )
}