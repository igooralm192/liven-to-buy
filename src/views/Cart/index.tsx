import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css'

import {
  removeCartProduct,
  incrementCartProductQuantity,
  decrementCartProductQuantity,
  addCartCoupon,
  removeCartCoupon,
  addCartPaymentMethod,
  removeCartPaymentMethod,
} from '../../store/cart/actions'

import CartItem from './CartItem'
import CartCoupon from './CartCoupon'
import CartCouponForm from './CartCouponForm'
import CartPaymentMethod from './CartPaymentMethod'
import CartPaymentMethodForm from './CartPaymentMethodForm'
import useCart from '../../hooks/useCart'

/*
  TODO:
  - [x] Show message when cart is empty.
*/

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const { products, isEmpty, coupon, paymentMethod } = useCart()

  function handleAddCoupon(newCoupon: string) {
    dispatch(addCartCoupon(newCoupon, 15))
  }

  function handleAddPaymentMethod(
    cardNumber: string,
    cardExpireDate: string,
    cardCvv: string,
  ) {
    const last4Digits = cardNumber.split('-')[3]
    const [expireMonth, expireYear] = cardExpireDate.split('/')

    dispatch(
      addCartPaymentMethod(
        last4Digits,
        Number(expireMonth),
        Number(expireYear),
      ),
    )
  }

  return (
    <main id="cart-container" className="content">
      <section className="cart items container">
        <h3 className="title">Your cart</h3>

        {isEmpty ? (
          <p className="empty">
            You have not yet added any products to your cart.
          </p>
        ) : (
          <ul className="cart items">
            {products.map(product => (
              <CartItem
                key={product.id}
                onIncrementQuantity={() =>
                  dispatch(incrementCartProductQuantity(product))
                }
                onDecrementQuantity={() =>
                  dispatch(decrementCartProductQuantity(product))
                }
                onRemoveItem={() => dispatch(removeCartProduct(product.id))}
                {...product}
              />
            ))}
          </ul>
        )}
      </section>

      {!isEmpty && (
        <>
          <section className="cart coupons container">
            <h3 className="title">Add coupon</h3>

            {coupon ? (
              <CartCoupon
                coupon={coupon}
                onRemoveCoupon={() => dispatch(removeCartCoupon())}
              />
            ) : (
              <CartCouponForm onAddCoupon={handleAddCoupon} />
            )}
          </section>

          <section className="cart payment-methods container">
            <h3 className="title">Add payment method</h3>

            {paymentMethod ? (
              <CartPaymentMethod
                paymentMethod={paymentMethod}
                onRemovePaymentMethod={() =>
                  dispatch(removeCartPaymentMethod())
                }
              />
            ) : (
              <CartPaymentMethodForm
                onAddPaymentMethod={handleAddPaymentMethod}
              />
            )}
          </section>

          <section className="cart total container">
            <h3 className="title">Total</h3>
          </section>
        </>
      )}
    </main>
  )
}

export default Cart
