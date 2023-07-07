import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser
} from 'react-icons/ai'
import { BiFoodMenu } from 'react-icons/bi'

const routes = [
  {
    name: 'Inicio',
    path: '/',
    Icon: AiOutlineHome
  },
  {
    name: 'Menú',
    path: '/menu',
    Icon: BiFoodMenu
  },
  {
    name: 'Carrito',
    path: '/cart',
    Icon: AiOutlineShoppingCart
  },
  {
    name: 'Perfil',
    path: '/profile',
    Icon: AiOutlineUser
  }
]

export default routes
