import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

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
          <Link to="/products">
            <img className="user logo" src={Logo} alt="Logo" />
          </Link>

          <ul className="user actions">
            <li className="user action">
              <FaUser />
            </li>
            <li className="user action cart">
              <Link to="/cart">
                <FaShoppingCart />
                {productAmount > 0 && (
                  <span className="amount">{productAmount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </header>
      {children}
    </div>
  )
}

export default UserLayout
