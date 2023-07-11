import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getMenu = async (from, to) => {
  const supabase = createServerComponentClient({
    cookies
  })

  const { data, error } = await supabase
    .from('menu')
    .select('*')
    .order('id', { ascending: true })
    .limit(7)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export default getMenu
