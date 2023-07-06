'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Auth from '../Auth/Auth'
import Modal from './Modal'
import useAuthModal from './useAuthModal.hook'

const AuthModal = () => {
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose, isOpen } = useAuthModal()

  useEffect(() => {
    if (session) {
      router.refresh()

      onClose()
    }
  }, [session, router, onClose])

  const onChange = (open) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth providers={['google']} />
    </Modal>
  )
}

export default AuthModal
