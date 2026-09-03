import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import google from "../assets/google.svg"
import { signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth"
import { auth, provider } from "../config/firebase"
import { validateAuthForm } from "../utils/validateAuthForm"
import { getFirebaseErrorMessage } from "../utils/getFirebaseErrorMessage"

export default function Signup(){

    const [ formData, setFormData ] = useState({email:"",password:""})
    const [error, setError] = useState('')
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
        setError("")

        const ValidateErrors = validateAuthForm(formData.email,formData.password)
        if(Object.keys(ValidateErrors).length > 0){
            setError(Object.values(ValidateErrors)[0])
            return
        }

        try {
          await createUserWithEmailAndPassword(auth, formData.email, formData.password)
          navigate('/dashboard')
        } catch (err) {
          console.log(err.code)
          setError(getFirebaseErrorMessage(err.code))
        }
      }

    async function handleGoogleAuth(){
        try {
            await signInWithPopup(auth, provider)
            navigate('/dashboard')
        } catch (err) {
            console.log(err.code)
            setError(getFirebaseErrorMessage(err.code))
        }  
    } 
    

    return(
        <section className="login-section">
            <h1>Sign Up</h1>
            <button className="google-btn"  onClick={handleGoogleAuth}><img src={google} alt="google icon" width="20"/><span>Signup with google</span></button>
            <p>OR</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handlechange} />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handlechange}/>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="auth-error">{error}</p>}
            <Link className="auth-link" to="/login">Back to Login</Link>
        </section>
    )
}