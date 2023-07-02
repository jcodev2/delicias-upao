import Link from 'next/link'
import Navigation from './Navigation'

const Header = () => {
  return (
    <header className='fixed bottom-0 flex h-16 w-full items-center justify-between border border-slate-200 bg-neutral-50 backdrop-blur-sm md:top-0 md:z-10 md:border-none md:bg-transparent md:px-2 md:backdrop-blur-0'>
      <Link
        href='/'
        className='hidden items-center justify-start gap-2 md:flex md:w-1/4'
      >
        <picture className='flex h-10 w-10 items-center justify-center'>
          <source
            srcSet='/img/logo.png'
            type='image/webp'
          />
          <img
            src='/img/logo.png'
            alt='DeliciasUp'
            className='h-10 w-10 object-contain'
          />
        </picture>
        <span className='text-xl font-semibold'>DeliciasUp</span>
      </Link>

      <Navigation />

      <div className='hidden items-center justify-end gap-4 md:flex md:w-1/4'>
        <button className='rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-semibold text-neutral-100 transition hover:opacity-95'>
          Sign In
        </button>
      </div>
    </header>
  )
}

export default Header
