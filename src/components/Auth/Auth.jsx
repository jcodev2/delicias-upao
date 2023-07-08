'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

const validateInput = (email, password, name = '') => {
  const errors = {}
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+=[\]{}|\\,.?:-]{8,}$/

  if (!email || !password) {
    errors.general = 'Please fill in all fields'
    return errors
  }

  if (name && !nameRegex.test(name)) {
    errors.name = 'Please enter a valid name'
  }

  if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (password.length < 8 || password.length > 32) {
    errors.password = 'Password must be between 8 and 32 characters'
  }

  if (!passwordRegex.test(password)) {
    errors.password =
      'Password must contain at least one uppercase letter, one lowercase letter and one number'
  }

  return errors
}

const Auth = ({ providers }) => {
  const supabaseClient = useSupabaseClient()

  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // create refs for input elements
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSignIn = async () => {
    setIsSubmitting(true)

    const errors = validateInput(name, email, password)

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

    const { error } = await supabaseClient.auth.signUp({
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
      setIsSubmitting(false)
    }
  }

  const handleSignUp = async () => {
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
      setErrors({ general: error.message })
      setIsSubmitting(false)
    } else {
      toast.success('Logged in successfully!')
      router.refresh()
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h3 className='text-center text-2xl font-bold text-neutral-900'>
        {isLogin ? 'Crea una cuenta' : 'Bienvenido de nuevo'}
      </h3>

      <p className='mb-2 text-center text-neutral-500'>
        {isLogin ? 'Regístrese para continuar' : 'Inicia sesión para continuar'}
      </p>

      <form
        className='flex w-full flex-col items-center justify-center gap-6 px-4'
        onSubmit={(e) => {
          e.preventDefault()
          setErrors({})
          setShowPassword(false)
          isLogin ? handleSignIn() : handleSignUp()
        }}
      >
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <button
            type='button'
            onClick={() => {}}
            className='flex w-full items-center justify-center gap-2 rounded-md bg-neutral-200/75 px-4 py-2 text-neutral-900'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              height='24'
              width='24'
            >
              <path
                fill='#4285f4'
                d='M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z'
              />
              <path
                fill='#34a853'
                d='M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z'
              />
              <path
                fill='#fbbc02'
                d='M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z'
              />
              <path
                fill='#ea4335'
                d='M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z'
              />
            </svg>
            <span className='text-base font-medium'>
              Inicia sesión con Google
            </span>
          </button>
        </div>

        <hr className='w-full border border-neutral-700/10' />

        {isLogin && (
          <div className='flex w-full flex-col gap-2'>
            <label
              htmlFor='name'
              className='cursor-pointer text-base font-medium text-neutral-700'
            >
              Nombre
            </label>
            <input
              className='h-10 w-full rounded-sm border border-neutral-700/10 bg-neutral-50 px-2 text-sm font-semibold outline-none ring-2 ring-transparent placeholder:text-black placeholder:text-opacity-50 focus:ring-1 focus:ring-neutral-300'
              type='text'
              id='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={nameRef}
            />

            {errors.general ? (
              <p className='text-sm text-red-500'>{errors.general}</p>
            ) : (
              errors.name && (
                <p className='text-sm text-red-500'>{errors.name}</p>
              )
            )}
          </div>
        )}

        <div className='flex w-full flex-col gap-2'>
          <label
            htmlFor='email'
            className='cursor-pointer text-base font-medium text-neutral-700'
          >
            Email
          </label>
          <input
            className='h-10 w-full rounded-sm border border-neutral-700/10 bg-neutral-50 px-2 text-sm font-semibold outline-none ring-2 ring-transparent placeholder:text-black placeholder:text-opacity-50 focus:ring-1 focus:ring-neutral-300'
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            ref={emailRef}
          />

          {errors.general ? (
            <p className='text-sm text-red-500'>{errors.general}</p>
          ) : (
            errors.email && (
              <p className='text-sm text-red-500'>{errors.email}</p>
            )
          )}
        </div>

        <div className='flex w-full flex-col gap-2'>
          <label
            htmlFor='password'
            className='cursor-pointer text-base font-medium text-neutral-700'
          >
            Contraseña
          </label>
          <input
            className='h-10 w-full rounded-sm border border-neutral-700/10 bg-neutral-50 px-2 text-sm font-semibold outline-none ring-2 ring-transparent placeholder:text-black placeholder:text-opacity-50 focus:ring-1 focus:ring-neutral-300'
            type={showPassword ? 'text' : 'password'}
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
          />

          {errors.general ? (
            <p className='text-sm text-red-500'>{errors.general}</p>
          ) : (
            errors.password && (
              <p className='text-sm text-red-500'>{errors.password}</p>
            )
          )}
        </div>

        <div className='flex w-full items-center gap-2'>
          <input
            type='checkbox'
            id='showPassword'
            className='h-4 w-4 rounded-sm border border-neutral-700/10 bg-neutral-50 px-2 text-sm font-semibold outline-none ring-2 ring-transparent focus:ring-1 focus:ring-neutral-300'
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label
            htmlFor='showPassword'
            className='cursor-pointer text-sm font-medium text-neutral-700'
          >
            Mostrar contraseña
          </label>
        </div>

        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`flex w-full items-center justify-center gap-2 rounded-md ${
              isSubmitting
                ? 'cursor-not-allowed bg-neutral-400'
                : 'bg-gradient-to-r from-orange-500 to-red-500'
            } px-4 py-2 text-white`}
          >
            {isSubmitting ? (
              <span className='text-base font-medium'>
                {isLogin ? 'Signing in...' : 'Signing up...'}
              </span>
            ) : (
              <span className='text-base font-medium'>
                {isLogin ? 'Iniciar sesión' : 'Registrarse'}
              </span>
            )}
          </button>
        </div>

        {!isLogin ? (
          <p className='text-sm font-medium text-neutral-700'>
            ¿No tienes una cuenta?{' '}
            <span
              className='cursor-pointer text-sm font-semibold text-orange-500'
              onClick={() => setIsLogin(!isLogin)}
            >
              Regístrate
            </span>
          </p>
        ) : (
          <p className='text-sm font-medium text-neutral-700'>
            ¿Ya tienes una cuenta?{' '}
            <span
              className='cursor-pointer text-sm font-semibold text-orange-500'
              onClick={() => setIsLogin(!isLogin)}
            >
              Inicia sesión
            </span>
          </p>
        )}
      </form>
    </>
  )
}

export default Auth
