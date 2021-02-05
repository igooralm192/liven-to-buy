import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import './styles.css'

import Logo from '../../assets/images/logo.svg'

import useCart from '../../hooks/useCart'

import { logoutUser } from '../../store/auth/actions'

const UserLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  // const { isAuthenticated } = useSelector((state: AppState) => state.auth)

  const { products: cartProducts } = useCart()

  const productsAmount = useMemo(() => cartProducts.length, [cartProducts])

  return (
    <div id="user-container">
      <header id="user-header">
        <div className="user content">
          <Link to="/products">
            <img className="user logo" src={Logo} alt="Logo" />
          </Link>

          <ul className="user options">
            <li id="user-option" className="user option">
              <FaUser />
              <ul id="user-actions">
                <li
                  className="user-action"
                  onClick={() => dispatch(logoutUser())}
                >
                  Logout
                </li>
              </ul>
            </li>
            <li className="user option cart">
              <Link to="/cart">
                <FaShoppingCart />
                {productsAmount > 0 && (
                  <span className="amount">{productsAmount}</span>
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
