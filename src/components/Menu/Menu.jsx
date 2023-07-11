'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useRef, useState } from 'react'
import { Loader } from '../Loader'
import MenuCard from './MenuCard'

const Menu = ({ menu }) => {
  const { supabaseClient } = useSessionContext()

  const PAGE_COUNT = 4

  const [loadedMenus, setLoadedMenus] = useState(menu)
  const [offset, setOffset] = useState(1)
  const [isInView, setIsInView] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  const containerRef = useRef(null)

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined' && !isLastPage) {
      const container = containerRef.current
      const { bottom } = container.getBoundingClientRect()
      const { innerHeight } = window
      setIsInView(bottom <= innerHeight)
    }
  }

  useEffect(() => {
    if (isLastPage) return

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLastPage])

  useEffect(() => {
    if (isInView) {
      loadMoreMenus(offset)
    }
  }, [isInView])

  const loadMoreMenus = async (offset) => {
    setLoading(true)

    setOffset((prev) => prev + 1)

    const { data } = await fetchMenus(offset, PAGE_COUNT)

    setLoadedMenus((prev) => [...prev, ...data])
    setLoading(false)
  }

  const fetchMenus = async (offset, PAGE_COUNT) => {
    try {
      const from = offset * PAGE_COUNT
      const to = offset * PAGE_COUNT + PAGE_COUNT - 1

      const { data } = await supabaseClient
        .from('menu')
        .select('id, name, description, image, stock, rating, price, active')
        .range(from, to)

      if (data.length < PAGE_COUNT) {
        setIsLastPage(true)
      }

      return { data }
    } catch (e) {
      console.error(e)

      return []
    }
  }

  return (
    <section
      className='mx-auto mb-24 mt-4 flex max-w-[1050px] flex-wrap items-center justify-center gap-4 px-4 md:mb-8'
      ref={containerRef}
    >
      {loadedMenus.map((menu) => (
        <MenuCard
          key={menu.id}
          {...menu}
        />
      ))}
      {loading && (
        <div className='flex w-full items-center justify-center'>
          <Loader />
        </div>
      )}
    </section>
  )
}

export default Menu
