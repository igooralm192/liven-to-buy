import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa'

import './styles.css'

import VisitantLayout from '../../layout/Visitant'
import { AppState } from '../../store'
import { authenticateUser } from '../../store/auth/thunks'

const SignIn: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { isFetching, error, isAuthenticated } = useSelector(
    (state: AppState) => state.auth,
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(async () => {
    if (!email || !password) return

    dispatch(authenticateUser(email, password))
  }, [dispatch, email, password])

  useEffect(() => {
    if (!isAuthenticated) return

    history.push('/products')
  }, [isAuthenticated, history])

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
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
            <span className="error-message" />
          </fieldset>
          <fieldset className="sign-in form-control">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
            <span className="error-message" />
          </fieldset>
        </form>

        <div className="sign-in actions">
          <Link to="/sign-in">
            <button
              type="button"
              className="sign-in action"
              onClick={handleSubmit}
              disabled={isFetching}
            >
              {isFetching ? `...` : `Sign in`}
            </button>
          </Link>
        </div>
      </section>
    </VisitantLayout>
  )
}

export default SignIn