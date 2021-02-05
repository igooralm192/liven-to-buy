import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import Image from '../../../components/Image'
import formatNumberToBRL from '../../../utils/formatNumberToBRL'

import './styles.css'

interface Props {
  name: string
  imageUrl: string
  quantity: number
  price: number
  onIncrementQuantity: () => void
  onDecrementQuantity: () => void
  onRemoveItem: () => void
}

const CartItem: React.FC<Props> = ({
  name,
  imageUrl,
  quantity,
  price,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemoveItem,
}) => {
  console.log(price)
  return (
    <li className="cart item">
      <div className="detail">
        <Image className="image" src={imageUrl} alt="Cart product" />
        <p className="name">{name}</p>
      </div>
      <div className="quantity">
        <h6 className="label">Quantity</h6>
        <div className="counter container">
          <button
            type="button"
            className="counter action"
            onClick={onDecrementQuantity}
          >
            <FaMinus />
          </button>
          <span className="counter value">{quantity}</span>
          <button
            type="button"
            className="counter action"
            onClick={onIncrementQuantity}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="total">
        <h6 className="label">Total</h6>
        <p className="value">{formatNumberToBRL(price * quantity)}</p>
      </div>
      <button type="button" className="remove action" onClick={onRemoveItem}>
        Remove
      </button>
    </li>
  )
}

export default React.memo(CartItem)
