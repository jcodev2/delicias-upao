'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Loader } from '../Loader'
import MenuCard from './MenuCard'

const Menu = ({ menu }) => {
  const { supabaseClient } = useSessionContext()

  const PAGE_COUNT = 7

  const [loadedMenus, setLoadedMenus] = useState(menu)
  const [offset, setOffset] = useState(1)
  const [isInView, setIsInView] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  const containerRef = useRef(null)

  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries
      setIsInView(entry.isIntersecting)
    },
    [setIsInView]
  )

  const loadMoreMenus = useCallback(
    async (offset) => {
      setLoading(true)

      setOffset((prev) => prev + 1)

      const { data } = await fetchMenus(offset, PAGE_COUNT)

      setLoadedMenus((prev) => [...prev, ...data])
      setLoading(false)
    },
    [setLoading, setLoadedMenus, setOffset]
  )

  const fetchMenus = async (offset, PAGE_COUNT) => {
    try {
      const from = offset * PAGE_COUNT
      const to = offset * PAGE_COUNT + PAGE_COUNT - 1

      const { data } = await supabaseClient
        .from('menu')
        .select('id, name, description, image, stock, rating, price, active')
        .range(from, to)
        .order('id', { ascending: true })

      if (data.length < PAGE_COUNT) {
        setIsLastPage(true)
      }

      return { data }
    } catch (e) {
      console.error(e)

      return []
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection)
    const currentContainerRef = containerRef.current

    if (currentContainerRef) {
      observer.observe(currentContainerRef)
    }

    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef)
      }
    }
  }, [handleIntersection])

  useEffect(() => {
    if (isInView && !loading && !isLastPage) {
      loadMoreMenus(offset)
    }
  }, [isInView, loading, isLastPage, offset, loadMoreMenus])

  return (
    <section className='mx-auto mb-24 mt-4 flex max-w-[1050px] flex-wrap items-center justify-center gap-4 px-4 md:mb-8'>
      {loadedMenus.map((menu) => (
        <MenuCard
          key={menu.id}
          {...menu}
        />
      ))}

      <div
        className='h-1 w-full'
        ref={containerRef}
      />

      {loading && (
        <div className='flex w-full items-center justify-center'>
          <Loader />
        </div>
      )}
    </section>
  )
}

export default memo(Menu)
