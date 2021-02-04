import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css'

import { AppState } from '../../store'
import {
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} from '../../store/cart/actions'

import CartItem from './CartItem'

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const productsById = useSelector((state: AppState) => state.products.byId)
  const cartProducts = useSelector((state: AppState) => state.cart.products)

  const items = useMemo(() => {
    return cartProducts.map(cartProduct => ({
      ...productsById[cartProduct.id],
      quantity: cartProduct.quantity,
    }))
  }, [cartProducts, productsById])

  return (
    <main id="cart-container" className="content">
      <h3 className="cart title">Your cart</h3>

      <ul className="cart items">
        {items.map(item => (
          <CartItem
            key={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            quantity={item.quantity}
            price={item.price}
            onIncrementQuantity={() => dispatch(incrementQuantity(item))}
            onDecrementQuantity={() => dispatch(decrementQuantity(item))}
            onRemoveItem={() => dispatch(removeProduct(item.id))}
          />
        ))}
      </ul>
    </main>
  )
}

export default Cart
