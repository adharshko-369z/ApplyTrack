import { Link } from "react-router-dom"
import google from "../assets/google.svg"

export default function Signup(){
    return(
        <section className="login-section">
            <h1>Sign Up</h1>
            <button className="google-btn"><img src={google} alt="" width="20"/><span>Signup with google</span></button>
            <p>OR</p>
            <form>
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
                <label>Password</label>
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            <Link className="auth-link" to="/login">Back to Login</Link>
        </section>
    )
}