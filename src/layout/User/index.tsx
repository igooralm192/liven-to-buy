import React from 'react'
import { FaUser, FaShoppingCart } from 'react-icons/fa'

import './styles.css'

import Logo from '../../assets/images/logo.svg'

const UserLayout: React.FC = ({ children }) => {
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
              <span className="amount">50</span>
            </li>
          </ul>
        </div>
      </header>
      {children}
    </div>
  )
}

export default UserLayout
