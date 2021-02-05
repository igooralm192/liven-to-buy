import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import Logo from '../../assets/images/logo.svg'
import Button from '../../components/Button'

const Welcome: React.FC = () => {
  return (
    <section id="welcome-container">
      <div id="welcome-title">
        Welcome to
        <img src={Logo} alt="Logo" />
      </div>
      <div id="welcome-description">
        This is Liven&apos;s virtual store, take a look at our products and
        guarantee the best offers!
      </div>

      <div id="welcome-actions">
        <Link to="/sign-in">
          <Button className="welcome-action">Sign In</Button>
        </Link>
        <Link to="/sign-up">
          <Button className="welcome-action">Sign Up</Button>
        </Link>
      </div>
    </section>
  )
}

export default Welcome
