import React, { useEffect, useMemo } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './styles.css'

import { Product } from '../../store/products/types'
import { CartCoupon } from '../../store/cart/types'
import formatNumberToBRL from '../../utils/formatNumberToBRL'
import { clearCartProducts } from '../../store/cart/actions'

interface CheckoutCart {
  cartProducts: Product[]
  cartCoupon?: CartCoupon
}

type Props = CheckoutCart

const Purchase: React.FC = () => {
  const location = useLocation<CheckoutCart>()

  if (!location.state || !Object.keys(location.state)) {
    return <Redirect to="/products" />
  }

  const { cartProducts, cartCoupon } = location.state

  return (
    <PurchaseWithCart cartProducts={cartProducts} cartCoupon={cartCoupon} />
  )
}

const PurchaseWithCart: React.FC<Props> = ({ cartProducts, cartCoupon }) => {
  const dispatch = useDispatch()

  const totalValue = useMemo(() => {
    return cartProducts.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0,
    )
  }, [cartProducts])

  const discountValue = useMemo(() => {
    return cartCoupon ? (totalValue * cartCoupon.discount) / 100 : 0
  }, [cartCoupon, totalValue])

  const totalDiscountedValue = useMemo(() => {
    return totalValue - discountValue
  }, [totalValue, discountValue])

  useEffect(() => {
    dispatch(clearCartProducts())
  }, [dispatch])

  return (
    <main id="purchase-container" className="content">
      <section id="purchase-resume-container">
        <h3 className="title">Your purchase</h3>

        <p className="description">
          Thank you for finalizing this purchase with us!&nbsp;
          <Link to="/products" className="link">
            Click here&nbsp;
          </Link>
          if you want to continue buying more.
        </p>

        <p className="summary-text">Below is a summary of your purchase:</p>

        <article id="purchase-resume">
          <div id="purchase-products">
            {cartProducts.map(({ id, name, quantity, price }) => (
              <div key={id} className="purchase-product">
                <h4 className="name">{name}</h4>
                <div className="detail">
                  <span className="quantity">{`x${quantity}`}</span>
                  <span className="total">
                    {formatNumberToBRL(price * quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {cartCoupon && (
            <div className="purchase-coupon">
              <h4 className="name">{cartCoupon.code}</h4>
              <div className="detail">
                <span className="quantity">x1</span>
                <span className="total">
                  {`- ${formatNumberToBRL(discountValue)}`}
                </span>
              </div>
            </div>
          )}

          <hr className="purchase-line" />

          <div className="purchase-total">
            <h4 className="name">Total</h4>
            <span className="total">
              {formatNumberToBRL(totalDiscountedValue)}
            </span>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Purchase
