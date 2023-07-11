import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getMenu = async () => {
  const supabase = createServerComponentClient({
    cookies
  })

  const { data, error } = await supabase
    .from('menu')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export default getMenu
