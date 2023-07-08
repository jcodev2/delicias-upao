import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getRestaurants = async () => {
  const supabase = createServerComponentClient({
    cookies
  })

  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export default getRestaurants
