import { memo } from 'react'

const ProfilePicture = memo(() => (
  <picture className='flex h-12 w-12 items-center justify-end'>
    <source
      srcSet='/img/default-profile.avif'
      type='image/avif'
    />
    <img
      src='/img/default-profile.avif'
      alt='Avatar'
      className='h-10 w-10 rounded-full object-contain'
    />
  </picture>
))

ProfilePicture.displayName = 'ProfilePicture'

export default ProfilePicture
