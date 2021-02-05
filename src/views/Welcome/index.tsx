import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import Logo from '../../assets/images/logo.svg'

const Welcome: React.FC = () => {
  return (
    <section className="welcome container">
      <div className="welcome title">
        Welcome to
        <img src={Logo} alt="Logo" />
      </div>
      <div className="welcome description">
        This is Liven&apos;s virtual store, take a look at our products and
        guarantee the best offers!
      </div>

      <div className="welcome actions">
        <Link to="/sign-in">
          <button type="button" className="welcome action">
            Sign In
          </button>
        </Link>
        <Link to="/sign-up">
          <button type="button" className="welcome action">
            Sign Up
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Welcome
