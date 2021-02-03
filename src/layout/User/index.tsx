import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaShoppingCart } from 'react-icons/fa'

import './styles.css'

import Logo from '../../assets/images/logo.svg'

import { AppState } from '../../store'

const UserLayout: React.FC = ({ children }) => {
  const { products: selectedProducts } = useSelector(
    (state: AppState) => state.cart,
  )

  const productAmount = useMemo(() => selectedProducts.length, [
    selectedProducts,
  ])

  return (
    <div id="user-container">
      <header id="user-header">
        <div className="user content">
          <img className="user logo" src={Logo} alt="Logo" />

          <ul className="user actions">
            <li className="user action">
              <FaUser />
            </li>
            <li className="user action cart">
              <FaShoppingCart />
              {productAmount > 0 && (
                <span className="amount">{productAmount}</span>
              )}
            </li>
          </ul>
        </div>
      </header>
      {children}
    </div>
  )
}

export default UserLayout
