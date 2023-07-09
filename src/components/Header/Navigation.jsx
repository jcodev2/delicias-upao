'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import routes from './Navigation.constants'

const Navigation = () => {
  const router = usePathname()

  return (
    <nav className='flex w-full items-center justify-center'>
      <ul className='flex w-full flex-row items-center justify-center gap-4 px-2 md:w-2/4'>
        {routes.map(({ name, Icon, path }) => (
          <li
            key={name}
            className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-full bg-gradient-to-r py-2 font-medium transition hover:text-neutral-600 md:rounded-none md:py-0 ${
              router === path
                ? 'bg-gradient-to-r from-orange-500 to-red-500 md:bg-transparent md:from-transparent md:to-transparent md:text-black md:hover:text-neutral-600'
                : ''
            }`}
          >
            <Link
              href={path}
              className='inline-flex h-full w-full flex-col items-center justify-center'
            >
              <Icon
                className={`text-2xl md:hidden ${
                  router === path ? 'text-neutral-100' : ''
                }`}
              />
              <span className='hidden md:block'>{name}</span>
            </Link>

            {router === path && (
              <span className='absolute -bottom-1 hidden h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 md:block' />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
