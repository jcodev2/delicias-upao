import {
  useSessionContext,
  useUser as useSupaUser
} from '@supabase/auth-helpers-react'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext(undefined)

export const MyUserContextProvider = (props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext()

  const user = useSupaUser()

  const accessToken = session?.access_token || null

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  const getUserDetails = () => supabase.from('users').select('*').single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true)

      Promise.allSettled([getUserDetails()]).then(([userDetails]) => {
        if (userDetails.status === 'fulfilled') {
          setUserDetails(userDetails.value.data)
        }

        setIsLoadingData(false)
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
    }
  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData
  }

  return (
    <UserContext.Provider
      value={value}
      {...props}
    />
  )
}
