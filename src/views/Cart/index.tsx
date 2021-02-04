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
import CartPaymentMethodForm from './CartPaymentMethodForm'

/*
  TODO:
  - [ ] Show message when cart is empty.
*/

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const productsById = useSelector((state: AppState) => state.products.byId)
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const cartCoupon = useSelector((state: AppState) => state.cart.coupon)

  const cartItems = useMemo(() => {
    return cartProducts.map(cartProduct => ({
      ...productsById[cartProduct.id],
      quantity: cartProduct.quantity,
    }))
  }, [cartProducts, productsById])

  function handleAddCoupon(coupon: string) {
    dispatch(addCoupon(coupon, 15))
  }

  function handleAddPaymentMethod(
    cardNumber: string,
    cardExpireDate: Date,
    cardCvv: string,
  ) {
    console.log(cardNumber, cardExpireDate, cardCvv)
  }

  return (
    <main id="cart-container" className="content">
      <section className="cart items container">
        <h3 className="title">Your cart</h3>

        <ul className="cart items">
          {cartItems.map(cartItem => (
            <CartItem
              key={cartItem.id}
              name={cartItem.name}
              imageUrl={cartItem.imageUrl}
              quantity={cartItem.quantity}
              price={cartItem.price}
              onIncrementQuantity={() => dispatch(incrementQuantity(cartItem))}
              onDecrementQuantity={() => dispatch(decrementQuantity(cartItem))}
              onRemoveItem={() => dispatch(removeProduct(cartItem.id))}
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

        <CartPaymentMethodForm onAddPaymentMethod={handleAddPaymentMethod} />
      </section>

      <section className="cart total container">
        <h3 className="title">Total</h3>
      </section>
    </main>
  )
}

export default Cart
