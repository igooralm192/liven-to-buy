import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './styles.css'

import CartItem from './CartItem'
import CartCoupon from './CartCoupon'
import CartCouponForm from './CartCouponForm'
import CartPaymentMethod from './CartPaymentMethod'
import CartPaymentMethodForm from './CartPaymentMethodForm'

import { PaymentErrorsCode } from '../../api/payment/types'

import useCart from '../../hooks/useCart'
import useNotification from '../../hooks/useNotification'

import {
  removeCartProduct,
  addCartCoupon,
  removeCartCoupon,
  addCartPaymentMethod,
  removeCartPaymentMethod,
} from '../../store/cart/actions'
import { checkoutCart } from '../../store/cart/thunks'

import formatNumberToBRL from '../../utils/formatNumberToBRL'

const Cart: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    products,
    isEmpty,
    isFetching,
    checkout,
    coupon,
    paymentMethod,
    error,
    incrementQuantity,
    decrementQuantity,
  } = useCart()

  const cartTotalValue = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.quantity * product.price,
      0,
    )
  }, [products])

  const couponDiscountValue = useMemo(() => {
    return coupon ? (cartTotalValue * coupon.discount) / 100 : 0
  }, [coupon, cartTotalValue])

  const cartFinalValue = useMemo(() => {
    return cartTotalValue - couponDiscountValue
  }, [cartTotalValue, couponDiscountValue])

  const cartTotalFormattedValue = useMemo(
    () => formatNumberToBRL(cartTotalValue),
    [cartTotalValue],
  )

  const couponDiscountFormattedValue = useMemo(
    () => formatNumberToBRL(couponDiscountValue),
    [couponDiscountValue],
  )

  const cartFinalFormattedValue = useMemo(
    () => formatNumberToBRL(cartFinalValue),
    [cartFinalValue],
  )

  const { showNotification } = useNotification()

  function handleAddCoupon(newCoupon: string) {
    dispatch(addCartCoupon(newCoupon, 15))
  }

  function handleAddPaymentMethod(cardNumber: string, cardExpireDate: string) {
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

  function handleCheckout() {
    dispatch(checkoutCart())
  }

  useEffect(() => {
    if (!error) return

    switch (error) {
      case PaymentErrorsCode.REQUIRED_PAYMENT_METHOD:
        showNotification(
          'Payment method required',
          'Please add an least one payment method.',
        )
        break

      default:
        break
    }
  }, [error, showNotification])

  useEffect(() => {
    if (!checkout) return

    history.push('/purchase', {
      cartProducts: products,
      cartCoupon: coupon,
    })
  }, [checkout, history, products, coupon])

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
                onIncrementQuantity={() => incrementQuantity(product)}
                onDecrementQuantity={() => decrementQuantity(product)}
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

          <section className="cart total-value container">
            <h3 className="title">Total</h3>

            <div id="cart-gross-value" className="info">
              <h4 className="label">Cart total</h4>
              <p className="value">{cartTotalFormattedValue}</p>
            </div>

            <div id="cart-discount-value" className="info">
              <h4 className="label">Coupon discount</h4>
              <p className="value">{`- ${couponDiscountFormattedValue}`}</p>
            </div>

            <div id="cart-net-value" className="info">
              <h4 className="label">Total</h4>
              <p className="value">{cartFinalFormattedValue}</p>
            </div>
          </section>

          <div className="cart finish container">
            <button
              type="button"
              className="cart finish action"
              onClick={handleCheckout}
              disabled={isFetching}
            >
              {isFetching ? `...` : 'Finish'}
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default Cart
