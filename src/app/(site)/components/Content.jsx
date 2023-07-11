'use client'

import { BackgroundBlur } from '@/components/BackgroundBlur'
import { Loader } from '@/components/Loader'
import dynamic from 'next/dynamic'
import { useCallback, useRef, useState } from 'react'

const DynamicRestaurants = dynamic(
  () => import('@/components/Restaurants/Restaurants'),
  {
    ssr: false,
    loading: () => <Loader />
  }
)

const Content = ({ restaurants }) => {
  const [showDynamicRestaurants, setShowDynamicRestaurants] = useState(false)

  const observer = useRef()

  const lastElementRef = useCallback((node) => {
    // Si el observer.current existe, lo desconectamos
    if (observer.current) observer.current.disconnect()

    // Creamos un nuevo observer
    observer.current = new IntersectionObserver(
      (entries) => {
        // Si el elemento es visible, mostramos el componente
        if (entries[0].isIntersecting) {
          setShowDynamicRestaurants(true)
        }
      },
      {
        root: null, // Es el viewport
        rootMargin: '0px', // Margen del viewport
        threshold: 0.5 // Porcentaje de visibilidad del elemento
      }
    )

    // Si el nodo existe, lo observamos
    if (node) observer.current.observe(node)
  }, [])

  return (
    <section
      className='relative mx-4 mb-20 mt-8 flex min-h-fit flex-col items-center gap-4 md:mb-8'
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
