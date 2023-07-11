import Image from 'next/image'
import { memo } from 'react'
import { AiFillStar, AiOutlinePlus, AiOutlineStock } from 'react-icons/ai'

const MenuCard = memo(
  ({ name, description, image, stock, rating, price, active }) => {
    return (
      <article className='flex w-full max-w-xs flex-col items-center justify-center rounded-md bg-neutral-50/60 shadow-sm md:w-1/2 lg:w-1/3 lg:justify-between'>
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className='h-56 w-full rounded-3xl object-cover object-center p-4'
        />

        <div className='flex h-full w-full flex-col justify-between gap-y-2 overflow-hidden rounded-md bg-gradient-to-bl from-neutral-50/40 via-neutral-50/50 to-neutral-50/50 px-4 pb-4 backdrop-blur-lg'>
          <h3 className='text-center text-lg font-semibold'>{name}</h3>
          <p className='truncate text-sm text-neutral-500'>{description}</p>

          <aside className='flex justify-between'>
            <div className='flex flex-col justify-center gap-y-1'>
              <div className='flex items-center gap-x-2'>
                <AiOutlineStock className='text-2xl text-neutral-900' />
                <p className='text-sm font-medium text-neutral-900'>{stock}</p>
              </div>

              <div className='flex items-center gap-x-2'>
                <AiFillStar className='text-2xl text-yellow-500' />
                <p className='text-sm font-medium text-neutral-900'>{rating}</p>
              </div>
            </div>

            <div className='flex flex-col items-center justify-between gap-y-1 rounded-md bg-neutral-100/50 px-2 py-1'>
              <p className='text-sm font-medium text-neutral-900'>${price}</p>
              <button
                className={`${
                  active ? 'bg-red-500' : 'bg-neutral-900'
                } rounded-full p-1 text-neutral-50/90`}
              >
                <AiOutlinePlus className='text-2xl text-neutral-50/90' />
              </button>
            </div>
          </aside>
        </div>
      </article>
    )
  }
)

MenuCard.displayName = 'MenuCard'

export default MenuCard
