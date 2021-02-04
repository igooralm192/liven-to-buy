import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css'

import { AppState } from '../../store'
import {
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  addCoupon,
  removeCoupon,
} from '../../store/cart/actions'

import CartItem from './CartItem'
import CartCoupon from './CartCoupon'
import CartCouponForm from './CartCouponForm'

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const productsById = useSelector((state: AppState) => state.products.byId)
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const cartCoupon = useSelector((state: AppState) => state.cart.coupon)

  const items = useMemo(() => {
    return cartProducts.map(cartProduct => ({
      ...productsById[cartProduct.id],
      quantity: cartProduct.quantity,
    }))
  }, [cartProducts, productsById])

  function handleAddCoupon(coupon: string) {
    dispatch(addCoupon(coupon, 15))
  }

  return (
    <main id="cart-container" className="content">
      <section className="cart items container">
        <h3 className="title">Your cart</h3>

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
      </section>

      <section className="cart coupons container">
        <h3 className="title">Add coupon</h3>

        {cartCoupon ? (
          <CartCoupon
            coupon={cartCoupon}
            onRemoveCoupon={() => dispatch(removeCoupon())}
          />
        ) : (
          <CartCouponForm onAddCoupon={handleAddCoupon} />
        )}
      </section>

      <section className="cart payment-method container">
        <h3 className="title">Add payment method</h3>
      </section>

      <section className="cart total container">
        <h3 className="title">Total</h3>
      </section>
    </main>
  )
}

export default Cart
