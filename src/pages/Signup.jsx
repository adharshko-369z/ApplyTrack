import { useAuthForm } from "../hooks/useAuthForm"
import { Link } from "react-router-dom"
import google from "../assets/google.svg"


export default function Signup(){

    const { formData, error, handleChange, handleSubmit, handleGoogleAuth } = useAuthForm('signup')

    return(
        <section className="auth-section">
            <h1>Sign Up</h1>
            <button className="google-btn"  onClick={handleGoogleAuth}><img src={google} alt="google icon" width="20"/><span>Signup with google</span></button>
            <p>OR</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="auth-error">{error}</p>}
            <Link className="auth-link" to="/login">Back to Login</Link>
        </section>
    )
}