import React, { useMemo } from 'react'
import { FaCreditCard } from 'react-icons/fa'

import { CartPaymentMethod as PaymentMethod } from '../../../store/cart/types'

import './styles.css'

interface Props {
  paymentMethod: PaymentMethod
  onRemovePaymentMethod: () => void
}

const CartPaymentMethod: React.FC<Props> = ({
  paymentMethod,
  onRemovePaymentMethod,
}) => {
  const paymentMethodFormatted = useMemo(() => {
    const { last4Digits, expireMonth, expireYear } = paymentMethod

    const cardNumber = `**** **** **** ${last4Digits}`
    const cardExpireDate = `${expireMonth}/${expireYear}`

    return `${cardNumber} - ${cardExpireDate}`
  }, [paymentMethod])

  return (
    <div className="cart payment-method">
      <div className="cart payment-method detail">
        <FaCreditCard className="icon" />
        <p className="card">{paymentMethodFormatted}</p>
      </div>

      <button
        type="button"
        className="cart payment-method action"
        onClick={onRemovePaymentMethod}
      >
        Remove
      </button>
    </div>
  )
}

export default CartPaymentMethod
