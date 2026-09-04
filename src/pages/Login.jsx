import { Link } from "react-router-dom"
import { useAuthForm } from "../hooks/useAuthForm"
import google from "../assets/google.svg"



export default function Login(){
   
    const { formData, error, handleChange, handleSubmit, handleGoogleAuth } = useAuthForm('login')

    return(
        <section className="auth-section">
            <h1>Log In</h1>
            <button className="google-btn" onClick={handleGoogleAuth}><img src={google} alt="google icon" width="20"/><span>Login with google</span></button>
            <p>OR</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                <button type="submit">Log In</button>
            </form>
            {error && <p className="auth-error">{error}</p>}
            <Link className="auth-link" to="/signup">Create new account</Link>
        </section>
    )
}