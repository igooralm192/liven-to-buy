import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

import './styles.css'

const Cart: React.FC = () => {
  return (
    <main id="cart-container" className="content">
      <h3 className="cart title">Your cart</h3>

      <ul className="cart products">
        <li className="cart product">
          <div className="detail">
            <img
              className="image"
              src="http://lorempixel.com/640/480/transport"
              alt="Cart product"
            />
            <p className="name">Pratical Fresh Chair</p>
          </div>
          <div className="quantity">
            <h6 className="label">Quantity</h6>
            <div className="counter container">
              <button type="button" className="counter action">
                <FaMinus />
              </button>
              <span className="counter value">3277</span>
              <button type="button" className="counter action">
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="total">
            <h6 className="label">Total</h6>
            <p className="value">R$ 706,00</p>
          </div>
          <button type="button" className="remove action">
            Remover
          </button>
        </li>
        <li className="cart product">
          <div className="detail">
            <img
              className="image"
              src="http://lorempixel.com/640/480/transport"
              alt="Cart product"
            />
            <p className="name">Pratical Fresh Chair</p>
          </div>
          <div className="quantity">
            <h6 className="label">Quantity</h6>
            <div className="counter container">
              <button type="button" className="counter action">
                <FaMinus />
              </button>
              <span className="counter value">3277</span>
              <button type="button" className="counter action">
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="total">
            <h6 className="label">Total</h6>
            <p className="value">R$ 706,00</p>
          </div>
          <button type="button" className="remove action">
            Remover
          </button>
        </li>
      </ul>
    </main>
  )
}

export default Cart
