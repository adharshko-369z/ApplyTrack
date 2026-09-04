import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, provider } from '../config/firebase'
import { validateAuthForm } from '../utils/validateAuthForm'
import { getFirebaseErrorMessage } from '../utils/getFirebaseErrorMessage'

export function useAuthForm(mode) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const validationErrors = validateAuthForm(formData.email, formData.password)
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0])
      return;
    }

    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
      }
      navigate('/dashboard');
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code))
    }
  }

  async function handleGoogleAuth() {
    setError('');
    try {
      await signInWithPopup(auth, provider)
      navigate('/dashboard')
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code))
    }
  }

  return { formData, error, handleChange, handleSubmit, handleGoogleAuth }
}