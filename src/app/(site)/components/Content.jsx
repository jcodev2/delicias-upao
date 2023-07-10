'use client'

import { BackgroundBlur } from '@/components/BackgroundBlur'
import { Loader } from '@/components/Loader'
import useIntersectionObserver from '@/hooks/useIntersectionObserver.hook'
import dynamic from 'next/dynamic'

const DynamicRestaurants = dynamic(
  () => import('@/components/Restaurants/Restaurants'),
  {
    ssr: false,
    loading: () => <Loader />
  }
)

const Content = ({ restaurants }) => {
  const [lastElementRef, showDynamicRestaurants] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  })

  return (
    <section
      className='relative mx-4 mb-20 mt-8 flex min-h-screen flex-col items-center gap-4 md:mb-8 lg:min-h-[90vh]'
      ref={lastElementRef}
    >
      <BackgroundBlur opacity='70' />

      <h2 className='text-3xl font-semibold md:text-4xl lg:text-6xl'>
        Restaurantes
      </h2>

      <p className='text-center text-xs text-slate-500 md:text-sm lg:text-base'>
        Hecha un vistazo a los restaurantes que tenemos para ti
      </p>

      {showDynamicRestaurants && (
        <DynamicRestaurants restaurants={restaurants} />
      )}
    </section>
  )
}
export default Content
