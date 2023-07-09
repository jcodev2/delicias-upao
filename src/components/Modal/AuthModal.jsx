'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { memo, useCallback, useEffect } from 'react'
import { Loader } from '../Loader'
import Modal from './Modal'
import useAuthModal from './useAuthModal.hook'

const DynamicAuth = dynamic(() => import('../Auth/Auth'), {
  loading: () => <Loader />,
  ssr: false
})

const AuthModal = memo(() => {
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose, isOpen } = useAuthModal()

  const onChange = useCallback(
    (open) => {
      if (!open) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [session, router, onClose])

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
    >
      {isOpen && <DynamicAuth providers={['google']} />}
    </Modal>
  )
})

AuthModal.displayName = 'AuthModal'

export default AuthModal
