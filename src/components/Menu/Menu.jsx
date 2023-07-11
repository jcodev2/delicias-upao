import MenuCard from './MenuCard'

const Menu = ({ menu }) => {
  return (
    <div className='menu'>
      {menu.map(
        ({ id, name, description, image, stock, rating, price, active }) => (
          <MenuCard
            key={id}
            name={name}
            description={description}
            image={image}
            stock={stock}
            rating={rating}
            price={price}
            active={active}
          />
        )
      )}
    </div>
  )
}

export default Menu
