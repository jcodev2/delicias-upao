import Link from 'next/link'
import { memo, useCallback, useState } from 'react'
import ProfileBox from './ProfileBox'
import ProfilePicture from './ProfilePicture'

const ProfileLink = memo(({ user, showBox, setShowBox }) => {
  const [showPicture, setShowPicture] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setShowPicture(true)
  }, [setShowPicture])

  const handleMouseLeave = useCallback(() => {
    setShowPicture(false)
  }, [setShowPicture])

  return (
    <Link
      href='/profile'
      className='relative flex items-center justify-center gap-2'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ProfilePicture />
      <ProfileBox
        user={user}
        showBox={showBox || showPicture}
        setShowBox={setShowBox}
      />
    </Link>
  )
})

ProfileLink.displayName = 'ProfileLink'

export default ProfileLink
