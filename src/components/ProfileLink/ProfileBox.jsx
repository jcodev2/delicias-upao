import { capitalizeFirstLetter } from '@/libs/helpers'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { memo, useCallback } from 'react'
import { toast } from 'react-hot-toast'

const ProfileBox = memo(({ user, showBox, setShowBox }) => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const getUserFromEmail = user?.email?.split('@')[0]
  const showFirstName = user?.user_metadata?.name?.split(' ')[0]

  const handleMouseEnter = useCallback(() => {
    setShowBox(true)
  }, [setShowBox])

  const handleMouseLeave = useCallback(() => {
    setShowBox(false)
  }, [setShowBox])

  return (
    <div
      className='absolute right-0 top-12 w-44 rounded-md border border-gray-200 bg-white p-2 shadow-md'
      style={{ display: showBox ? 'block' : 'none' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className='text-center text-sm text-gray-600'>
        Bienvenido, {capitalizeFirstLetter(showFirstName) || getUserFromEmail}
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
})

ProfileBox.displayName = 'ProfileBox'

export default ProfileBox
