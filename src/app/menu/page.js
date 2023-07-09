'use client'

import { BackgroundBlur } from '@/components/BackgroundBlur'
import LineSVG from '@/components/BackgroundBlur/LineSvg'
import useAuthModal from '@/components/Modal/useAuthModal.hook'
import useUser from '@/hooks/useUser.hook'
import { useEffect } from 'react'

export default function Menu() {
  const { user } = useUser()
  const { onOpen } = useAuthModal()

  useEffect(() => {
    // check if the user is logged in and if not, open the modal
    if (!user) {
      onOpen()
    }
  }, [user, onOpen])

  return (
    <>
      <BackgroundBlur />

      <h1 className='mx-auto max-w-4xl text-center text-4xl font-medium tracking-tight text-slate-900 md:mt-24 md:text-5xl lg:text-7xl'>
        Menu{' '}
        <span className='relative inline-block whitespace-nowrap text-red-500'>
          <LineSVG />
          <span className='relative'>de Delicias Upao</span>
        </span>
      </h1>
    </>
  )
}
