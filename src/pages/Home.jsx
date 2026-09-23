import { Link } from "react-router-dom"

export default function Home(){
    return(
        <section className="home-page page-container">
            <h1>Know exactly where your job search stands</h1>
            <p>Track applications, follow their progress, and never lose track of where you applied.</p>
            <Link className="route-links-to-btns" to="/dashboard">Start Tracking</Link>
        </section>
    )
}