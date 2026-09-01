import { Link } from "react-router-dom"

export default function Home(){
    return(
        <section className="home-page">
            <h1>Know exactly where your job search stands</h1>
            <p>Track every application and see exactly where you stand.</p>
            <Link className="route-links-to-btns" to="/dashboard">Start Tracking</Link>
        </section>
    )
}