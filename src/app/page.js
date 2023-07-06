import { BackgroundBlur } from '@/components/BackgroundBlur'
import LineSVG from '@/components/BackgroundBlur/LineSvg'
import { Hand } from '@/components/Hand'
import Link from 'next/link'
import { Balancer } from 'react-wrap-balancer'

export default function Home() {
  return (
    <>
      <BackgroundBlur />

      <div className='flex min-h-screen flex-col items-center justify-center'>
        <Balancer>
          <h1 className='mx-auto max-w-4xl text-center text-4xl font-medium tracking-tight text-slate-900 md:text-5xl lg:text-7xl'>
            Encuentra{' '}
            <span className='relative inline-block whitespace-nowrap text-red-500'>
              <LineSVG />
              <span className='relative'>los mejores</span>
            </span>{' '}
            bocadillos en el mundo
          </h1>

          <p className='mx-auto mt-4 w-3/4 max-w-xl text-center text-base font-normal text-slate-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </Balancer>

        <Link
          className='mt-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-medium text-white transition hover:opacity-95'
          href='/menu'
        >
          Look for a hambuger
        </Link>
      </div>

      <Hand />
    </>
  )
}
