import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const Purchase: React.FC = () => {
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
            <div className="purchase-product">
              <h4 className="name">Pratical Fresh Chair</h4>
              <div className="detail">
                <span className="quantity">x2</span>
                <span className="total">R$ 1.514,00</span>
              </div>
            </div>
          </div>

          <div className="purchase-coupon">
            <h4 className="name">CUPOM15</h4>
            <div className="detail">
              <span className="quantity">x1</span>
              <span className="total">- R$ 352,00</span>
            </div>
          </div>

          <div className="purchase-total">
            <h4 className="name">Total</h4>
            <span className="total">R$ 1.200,00</span>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Purchase
