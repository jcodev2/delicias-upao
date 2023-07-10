'use client'

import RestaurantCard from './RestaurantCard'

const Restaurants = ({ restaurants }) => {
  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-y-4 md:gap-x-4'>
      {restaurants.map(({ id, name, description, image, rating, location }) => (
        <RestaurantCard
          key={id}
          name={name}
          description={description}
          image={image}
          rating={rating}
          location={location}
        />
      ))}
    </div>
  )
}

export default Restaurants
