import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser
} from 'react-icons/ai'
import { BiFoodMenu } from 'react-icons/bi'

const routes = [
  {
    name: 'Home',
    path: '/',
    Icon: AiOutlineHome
  },
  {
    name: 'Menu',
    path: '/menu',
    Icon: BiFoodMenu
  },
  {
    name: 'Cart',
    path: '/cart',
    Icon: AiOutlineShoppingCart
  },
  {
    name: 'Profile',
    path: '/profile',
    Icon: AiOutlineUser
  }
]

export default routes
