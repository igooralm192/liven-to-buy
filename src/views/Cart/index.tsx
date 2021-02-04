import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css'

import { AppState } from '../../store'
import {
  loadCartProducts,
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
import CartPaymentMethodForm from './CartPaymentMethodForm'
import CartPaymentMethod from './CartPaymentMethod'

/*
  TODO:
  - [x] Show message when cart is empty.
*/

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const productsById = useSelector((state: AppState) => state.products.byId)
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const cartCoupon = useSelector((state: AppState) => state.cart.coupon)
  const cartPaymentMethod = useSelector(
    (state: AppState) => state.cart.paymentMethod,
  )

  const cartItems = useMemo(() => {
    return cartProducts.map(cartProduct => ({
      ...productsById[cartProduct.id],
      quantity: cartProduct.quantity,
    }))
  }, [cartProducts, productsById])

  const haveCartItems = useMemo(() => cartItems.length > 0, [cartItems])

  function handleAddCoupon(coupon: string) {
    dispatch(addCartCoupon(coupon, 15))
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

  useEffect(() => {
    console.log('OPA', productsById, haveCartItems)
    // Verificar se existem produtos no store
    if (Object.keys(productsById).length === 0) return

    // Se sim, carregar carrinho da sessão caso carrinho esteja vazio
    if (!haveCartItems) dispatch(loadCartProducts())
  }, [productsById])

  return (
    <main id="cart-container" className="content">
      <section className="cart items container">
        <h3 className="title">Your cart</h3>

        {!haveCartItems ? (
          <p className="empty">
            You have not yet added any products to your cart.
          </p>
        ) : (
          <ul className="cart items">
            {cartItems.map(cartItem => (
              <CartItem
                key={cartItem.id}
                name={cartItem.name}
                imageUrl={cartItem.imageUrl}
                quantity={cartItem.quantity}
                price={cartItem.price}
                onIncrementQuantity={() =>
                  dispatch(incrementCartProductQuantity(cartItem))
                }
                onDecrementQuantity={() =>
                  dispatch(decrementCartProductQuantity(cartItem))
                }
                onRemoveItem={() => dispatch(removeCartProduct(cartItem.id))}
              />
            ))}
          </ul>
        )}
      </section>

      {haveCartItems && (
        <>
          <section className="cart coupons container">
            <h3 className="title">Add coupon</h3>

            {cartCoupon ? (
              <CartCoupon
                coupon={cartCoupon}
                onRemoveCoupon={() => dispatch(removeCartCoupon())}
              />
            ) : (
              <CartCouponForm onAddCoupon={handleAddCoupon} />
            )}
          </section>

          <section className="cart payment-methods container">
            <h3 className="title">Add payment method</h3>

            {cartPaymentMethod ? (
              <CartPaymentMethod
                paymentMethod={cartPaymentMethod}
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
