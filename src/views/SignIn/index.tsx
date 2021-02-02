import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa'

import './styles.css'

import VisitantLayout from '../../layout/Visitant'

const SignIn: React.FC = () => {
  const history = useHistory()

  return (
    <VisitantLayout>
      <section className="sign-in container">
        <div className="sign-in back">
          <FaArrowLeft onClick={() => history.goBack()} />
        </div>

        <div className="sign-in title">Sign in</div>

        <div className="sign-in logged">
          Already have an account?
          <Link to="/sign-up"> Sign up.</Link>
        </div>

        <form className="sign-in form">
          <fieldset className="sign-in form-control">
            <input type="text" placeholder="E-mail" />
            <FaEnvelope className="icon" />
            <span className="error-message" />
          </fieldset>
          <fieldset className="sign-in form-control">
            <input type="text" placeholder="Password" />
            <FaLock className="icon" />
            <span className="error-message" />
          </fieldset>
        </form>

        <div className="sign-in actions">
          <Link to="/sign-in">
            <button type="button" className="sign-in action">
              Sign In
            </button>
          </Link>
        </div>
      </section>
    </VisitantLayout>
  )
}

export default SignIn
