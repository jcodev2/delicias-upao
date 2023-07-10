'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { memo, useCallback, useEffect } from 'react'
import useAuthModal from './useAuthModal.hook'
import { Auth } from '../Auth'

const DynamicModal = dynamic(() => import('./Modal'), {
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
    <>
      {isOpen && (
        <DynamicModal
          isOpen={isOpen}
          onChange={onChange}
        >
          <Auth />
        </DynamicModal>
      )}
    </>
  )
})

AuthModal.displayName = 'AuthModal'

export default AuthModal
