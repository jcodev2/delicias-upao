'use client'

import { BackgroundBlur } from '@/components/BackgroundBlur'
import { Restaurants } from '@/components/Restaurants'

const Content = ({ restaurants }) => {
  return (
    <section className='relative mx-4 mb-20 mt-8 flex min-h-fit flex-col items-center gap-4 md:mb-8'>
      <BackgroundBlur opacity='70' />

      <h2 className='text-3xl font-semibold md:text-4xl lg:text-6xl'>
        Restaurantes
      </h2>

      <p className='text-center text-xs text-slate-500 md:text-sm lg:text-base'>
        Hecha un vistazo a los restaurantes que tenemos para ti
      </p>

      <Restaurants restaurants={restaurants} />
    </section>
  )
}
export default Content
