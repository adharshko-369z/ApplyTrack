import { Link } from "react-router-dom"
import { useAuthForm } from "../hooks/useAuthForm"
import google from "../assets/google.svg"



export default function Login(){
   
    const { formData, error, handleChange, handleSubmit, handleGoogleAuth } = useAuthForm('login')

    return(
        <section className="auth-section">
            <h1>Log In</h1>
            <button className="google-btn" onClick={handleGoogleAuth}><img src={google} alt="google icon" width="20"/><span>Login with google</span></button>
            <p className="or">OR</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} />
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                <button className="auth-btn route-links-to-btns" type="submit">Log In</button>
            </form>
            {error && <p className="field-error">{error}</p>}
            <Link className="auth-link" to="/signup">Create new account</Link>
        </section>
    )
}