import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import google from "../assets/google.svg"
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../config/firebase";


export default function Login(){
    const [ formData, setFormData ] = useState({email:"",password:""})
    const navigate = useNavigate()

    function handlechange(e){
            setFormData(prevFormData =>{
                return({
                    ...prevFormData,
                    [e.target.name] : e.target.value
                })
            })
        }
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    async function handleGoogleAuth(){
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        }  
    } 
    

    return(
        <section className="login-section">
            <h1>Log In</h1>
            <button className="google-btn" onClick={handleGoogleAuth}><img src={google} alt="google icon" width="20"/><span>Login with google</span></button>
            <p>OR</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handlechange} />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handlechange}/>
                <button type="submit">Log In</button>
            </form>
            <Link className="auth-link" to="/signup">Create new account</Link>
        </section>
    )
}