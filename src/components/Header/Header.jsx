'use client'

import useUser from '@/hooks/useUser.hook'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { memo, useState } from 'react'
import useAuthModal from '../Modal/useAuthModal.hook'
import Navigation from './Navigation'

const DynamicProfileLink = dynamic(() => import('../ProfileLink/ProfileLink'), {
  ssr: false
})

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
          <DynamicProfileLink
            user={user}
            showBox={showBox}
            setShowBox={setShowBox}
          />
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

export default memo(Header)
