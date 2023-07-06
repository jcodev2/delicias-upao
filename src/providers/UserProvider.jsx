'use client'

import { MyUserContextProvider } from '@/contexts/UserContex'

const UserProvider = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>
}

export default UserProvider
