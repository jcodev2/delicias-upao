import Image from 'next/image'
import PropTypes from 'prop-types'
import { IoMdClose } from 'react-icons/io'
import Overlay from './Overlay'

const Modal = ({ isOpen, onChange, children }) => {
  return (
    <>
      {isOpen && (
        <section className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center'>
          <Overlay onChange={onChange} />

          <article className='relative flex min-h-screen w-full max-w-3xl flex-col justify-start bg-white p-4 pt-10 shadow-lg md:min-h-min md:flex-row md:gap-0 md:rounded-lg md:p-0 md:shadow-xl md:backdrop-blur-lg'>
            <div className='flex w-full flex-col items-center justify-start gap-2 md:w-1/2 md:items-center md:justify-center md:py-8'>
              <button
                className='absolute right-4 top-10 text-3xl text-neutral-500 transition hover:text-neutral-600 md:right-2 md:top-2 md:text-neutral-100 md:hover:text-neutral-300'
                onClick={() => onChange(false)}
              >
                <IoMdClose />
              </button>

              {children}
            </div>

            <Image
              src='/img/login.avif'
              alt='Hero'
              className='hidden md:block md:w-1/2 md:rounded-r-lg md:object-cover md:object-center'
              width={500}
              height={500}
            />
          </article>
        </section>
      )}
    </>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal
