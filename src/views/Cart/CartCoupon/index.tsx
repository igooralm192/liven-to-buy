import React from 'react'
import { FaTicketAlt } from 'react-icons/fa'

import { CartCoupon as Coupon } from '../../../store/cart/types'

import './styles.css'

interface Props {
  coupon: Coupon
  onRemoveCoupon: () => void
}

const CartCoupon: React.FC<Props> = ({ coupon, onRemoveCoupon }) => {
  return (
    <div className="cart coupon">
      <div className="cart coupon detail">
        <FaTicketAlt className="icon" />
        <p className="code">{`${coupon.code} - ${coupon.discount}% OFF`}</p>
      </div>

      <button
        type="button"
        className="cart coupon action"
        onClick={onRemoveCoupon}
      >
        Remove
      </button>
    </div>
  )
}

export default CartCoupon
