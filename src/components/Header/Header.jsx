'use client'

import useUser from '@/hooks/useUser.hook'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import useAuthModal from '../Modal/useAuthModal.hook'
import Navigation from './Navigation'

const ProfileBox = ({ user, showBox, setShowBox }) => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const getUserFromEmail = user?.email?.split('@')[0]
  const showFirstName = user?.user_metadata?.name?.split(' ')[0]

  return (
    <div
      className='absolute right-0 top-12 w-44 rounded-md border border-gray-200 bg-white p-2 shadow-md'
      style={{ display: showBox ? 'block' : 'none' }}
      onMouseEnter={() => setShowBox(true)}
      onMouseLeave={() => setShowBox(false)}
    >
      <p className='text-center text-sm text-gray-600'>
        Bienvenido, {showFirstName || getUserFromEmail}
      </p>
      <button
        className='flex w-full justify-center text-sm font-semibold text-red-500 hover:text-red-600'
        onClick={async (e) => {
          e.preventDefault()

          const { error } = await supabaseClient.auth.signOut()

          if (!error) {
            toast.success('Logout successful!')
            return
          }

          router.refresh()
        }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}

const ProfilePicture = () => (
  <picture className='flex h-12 w-12 items-center justify-end'>
    <source
      srcSet='/img/default-profile.png'
      type='image/webp'
    />
    <img
      src='/img/default-profile.png'
      alt='Avatar'
      className='h-10 w-10 rounded-full object-contain'
    />
  </picture>
)

const ProfileLink = ({ user, showBox, setShowBox }) => (
  <Link
    href='/profile'
    className='relative flex items-center justify-center gap-2'
    onMouseEnter={() => setShowBox(true)}
    onMouseLeave={() => setShowBox(false)}
  >
    <ProfilePicture />
    <ProfileBox
      user={user}
      showBox={showBox}
      setShowBox={setShowBox}
    />
  </Link>
)

const Header = () => {
  const { onOpen } = useAuthModal()
  const { user } = useUser()

  const [showBox, setShowBox] = useState(false)

  return (
    <header className='fixed bottom-0 z-40 flex h-16 w-full items-center justify-between border border-slate-200 bg-neutral-50 md:top-0 md:z-10 md:border-none md:bg-neutral-50/30 md:px-4 md:backdrop-blur-md'>
      <Link
        href='/'
        className='hidden items-center justify-start gap-2 md:flex md:w-1/4'
      >
        <picture className='flex h-10 w-10 items-center justify-center'>
          <source
            srcSet='/img/logo.png'
            type='image/webp'
          />
          <img
            src='/img/logo.png'
            alt='DeliciasUp'
            className='h-10 w-10 object-contain'
          />
        </picture>
        <span className='text-xl font-semibold'>DeliciasUp</span>
      </Link>

      <Navigation />

      <div className='hidden items-center justify-end gap-4 md:flex md:w-1/4'>
        {user ? (
          <>
            <ProfileLink
              user={user}
              showBox={showBox}
              setShowBox={setShowBox}
            />
          </>
        ) : (
          <button
            className='rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-semibold text-neutral-100 transition hover:opacity-95'
            onClick={onOpen}
          >
            Regístrate
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
