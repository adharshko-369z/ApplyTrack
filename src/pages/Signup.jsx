import { useAuthForm } from "../hooks/useAuthForm"
import { Link } from "react-router-dom"
import google from "../assets/google.svg"


export default function Signup(){

    const { formData, error, handleChange, handleSubmit, handleGoogleAuth } = useAuthForm('signup')

    return(
        <section className="auth-section">
            <h1>Sign Up</h1>
            <button className="google-btn"  onClick={handleGoogleAuth}><img src={google} alt="google icon" width="20"/><span>Signup with google</span></button>
            <p className="or">OR</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="signup-email" >Email</label>
                <input id="signup-email" type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} />
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                <button className="auth-btn route-links-to-btns" type="submit">Sign Up</button>
            </form>
            {error && <p className="field-error">{error}</p>}
            <Link className="auth-link" to="/login">Back to Login</Link>
        </section>
    )
}