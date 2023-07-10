import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import validateInput from './validateInput'

const useAuth = () => {
  const supabaseClient = useSupabaseClient()

  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSignIn = useCallback(async () => {
    setIsSubmitting(true)

    const errors = validateInput(email, password, name)

    setErrors(errors)

    // focus on first empty input field
    if (!name) {
      nameRef.current.focus()
      setIsSubmitting(false)
      return
    }
    if (!email) {
      emailRef.current.focus()
      setIsSubmitting(false)
      return
    }
    if (!password) {
      passwordRef.current.focus()
      setIsSubmitting(false)
      return
    }

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false)
      return
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    if (error) {
      setErrors({ general: error.message })
      setIsSubmitting(false)
    } else {
      toast.success('Account created successfully!')
      router.refresh()
      if (data?.user.confirmation_sent_at) {
        toast.success('Confirmation email sent successfully!')
      }
      setIsSubmitting(false)
    }
  }, [email, name, password, router, supabaseClient])

  const handleSignUp = useCallback(async () => {
    setIsSubmitting(true)

    const errors = validateInput(email, password)

    setErrors(errors)

    // focus on first empty input field
    if (!email) {
      emailRef.current.focus()
      setIsSubmitting(false)
      return
    }
    if (!password) {
      passwordRef.current.focus()
      setIsSubmitting(false)
      return
    }

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false)
      return
    }

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error(error.message)
      setErrors({ general: error.message })
      setIsSubmitting(false)
    } else {
      toast.success('Logged in successfully!')
      router.refresh()
      setIsSubmitting(false)
    }
  }, [email, password, router, supabaseClient])

  return {
    isLogin,
    setIsLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    setErrors,
    nameRef,
    emailRef,
    passwordRef,
    handleSignIn,
    handleSignUp
  }
}

export default useAuth
