import getMenu from '@/actions/getMenu'
import { BackgroundBlur } from '@/components/BackgroundBlur'
import { MenuComponent } from '@/components/Menu'

export const revalidate = 0

export default async function Menu() {
  const menu = await getMenu()

  return (
    <>
      <BackgroundBlur opacity='70' />

      <h1 className='mx-auto mt-4 max-w-4xl text-center text-4xl font-bold tracking-tight text-slate-900 md:mt-24 md:text-5xl lg:text-6xl'>
        Menu
      </h1>

      <MenuComponent menu={menu} />
    </>
  )
}
