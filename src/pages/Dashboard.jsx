import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { db } from "../config/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import DashboardSkeleton from "../components/loading-components/DashboardSkeleton"

const STATUSES = ["no_response", "interviewing", "offer", "rejected"]

export default function Dashboard( ) {
  const [applications, setApplications] = useState([])
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApplications() {
      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid)
      )

      const snapshot = await getDocs(q)
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      setApplications(apps)
      setLoading(false)
    }

    if (user) {
      fetchApplications()
    }
  }, [user])

  const counts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {})

  const total = applications.length

  function renderResponseRate(counts,total){
    if(!counts) return 0

    const filteredStatusCounts = Object.entries(counts)
                            .filter(([key]) => key !== "no_response")
                            .reduce((acc,current)=> acc+current[1], 0)

    const responseRate = (filteredStatusCounts / total)*100

    return Math.round(responseRate) || 0
  }

  function renderProgressionRate(counts,total){

    if(!counts) return 0

    const filteredStatusCounts = Object.entries(counts)
                            .filter(([key]) => key !== "no_response" && key !== "rejected")
                            .reduce((acc,current)=> acc+current[1], 0)

    const responseRate = (filteredStatusCounts / total)*100

    return Math.round(responseRate) || 0

  }

  return (
    <section className="dashboard-page">

      { loading ?(
        <DashboardSkeleton />
      ) : total === 0 ?
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
          {STATUSES.map(status => (
              <div key={status} className={`status-card ${status}-card`}>
              <p className="status-count">{counts[status] || 0}</p>
              <p className="status-label">{status.replace("_", " ")}</p>
              {counts[status] > 0 ? (
                <Link to={`/applications?status=${status}`} className="status-link">
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