'use client'

import { Balancer } from 'react-wrap-balancer'
import { BackgroundBlur } from '../BackgroundBlur'
import RestaurantCard from './RestaurantCard'

const Restaurants = ({ restaurants }) => {
  return (
    <section className='relative mx-4 mb-20 mt-8 flex min-h-screen flex-col items-center gap-4 md:mb-8 lg:min-h-[90vh]'>
      <BackgroundBlur />

      <Balancer className='text-center'>
        <h2 className='mb-2 text-3xl font-semibold md:text-4xl lg:text-6xl'>
          Restaurantes
        </h2>

        <p className='text-center text-xs text-slate-500 md:text-sm lg:text-base'>
          Hecha un vistazo a los restaurantes que tenemos para ti
        </p>
      </Balancer>

      <div className='flex w-full flex-wrap items-center justify-center gap-y-4 md:gap-x-4'>
        {restaurants.map(
          ({ id, name, description, image, rating, location }) => (
            <RestaurantCard
              key={id}
              name={name}
              description={description}
              image={image}
              rating={rating}
              location={location}
            />
          )
        )}
      </div>
    </section>
  )
}

export default Restaurants
