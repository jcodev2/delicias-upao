import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import { BiSolidLocationPlus } from 'react-icons/bi'

const RestaurantCard = ({ name, description, image, rating, location }) => {
  return (
    <article className='flex w-full max-w-sm flex-col items-center justify-between rounded-md shadow-sm lg:w-[45%] lg:max-w-lg'>
      <Image
        src={image}
        alt={name}
        className='h-52 w-full rounded-t-lg object-cover'
        width={500}
        height={300}
      />

      <div className='flex w-full flex-col items-center justify-between gap-y-4 rounded-b-lg bg-neutral-50/40 p-4'>
        <div className='flex w-full flex-col items-center justify-between'>
          <h3 className='text-xl font-semibold'>{name}</h3>

          <p className='text-justify text-sm'>{description}</p>
        </div>

        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center justify-between gap-2'>
            <AiFillStar className='text-yellow-400' />

            <span className='text-sm font-semibold'>{rating}</span>
          </div>

          <div className='flex items-center justify-between gap-2'>
            <BiSolidLocationPlus className='text-red-400' />

            <span className='text-sm font-semibold'>{location}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default RestaurantCard
