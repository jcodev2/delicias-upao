import getRestaurants from '@/actions/getRestaurants'
import { BackgroundBlur } from '@/components/BackgroundBlur'
import LineSVG from '@/components/BackgroundBlur/LineSvg'
import { Hand } from '@/components/Hand'
import { Restaurants } from '@/components/Restaurants'
import Link from 'next/link'
import { Balancer } from 'react-wrap-balancer'

export const revalidate = 0

export default async function Home() {
  const restaurants = await getRestaurants()

  return (
    <>
      <section className='relative flex min-h-screen flex-col items-center justify-center'>
        <BackgroundBlur />

        <Balancer className=''>
          <h1 className='mx-auto max-w-4xl text-center text-4xl font-medium tracking-tight text-slate-900 md:text-5xl lg:text-7xl'>
            Encuentra{' '}
            <span className='relative inline-block whitespace-nowrap text-red-500'>
              <LineSVG />
              <span className='relative'>los mejores</span>
            </span>{' '}
            bocadillos en el mundo
          </h1>

          <p className='mx-auto mt-4 w-full max-w-xl text-center text-sm font-normal text-slate-500 md:text-base'>
            Adéntrate en el mundo de los bocadillos, encuentra el que más te
            guste y disfruta de una experiencia única.
          </p>
        </Balancer>

        <Link
          className='mt-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-medium text-white transition hover:opacity-95'
          href='/menu'
        >
          Explorar el menú
        </Link>

        <Hand />
      </section>

      <Restaurants restaurants={restaurants} />
    </>
  )
}
