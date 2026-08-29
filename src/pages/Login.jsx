import { Link } from "react-router-dom"
import google from "../assets/google.svg"


export default function Login(){
    return(
        <section className="login-section">
            <h1>Log In</h1>
            <button className="google-btn"><img src={google} alt="" width="20"/><span>Login with google</span></button>
            <p>OR</p>
            <form>
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
                <label>Password</label>
                <input type="password" placeholder="Password" />
                <button type="submit">Log In</button>
            </form>
            <Link className="auth-link" to="/signup">Create new account</Link>
        </section>
    )
}