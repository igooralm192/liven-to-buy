import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa'

import './styles.css'

import Notification from '../../components/Notification'
import VisitantLayout from '../../layout/Visitant'

import { AuthenticateUserByEmailErrorsCode } from '../../api/auth'
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

  const [open, setOpen] = useState(false)
  const [notificationTitle, setNotificationTitle] = useState('')
  const [notificationDescription, setNotificationDescription] = useState('')

  const handleSubmit = useCallback(async () => {
    if (!email || !password) return

    dispatch(authenticateUser(email, password))
  }, [dispatch, email, password])

  useEffect(() => {
    if (!isAuthenticated) return

    history.push('/products')
  }, [isAuthenticated, history])

  useEffect(() => {
    if (!error) return () => {}

    switch (error) {
      case AuthenticateUserByEmailErrorsCode.INCORRECT_EMAIL:
        setNotificationTitle('Incorrect e-mail')
        setNotificationDescription('This user does not exists.')
        break

      case AuthenticateUserByEmailErrorsCode.INCORRECT_PASSWORD:
        setNotificationTitle('Incorrect password')
        setNotificationDescription(
          'This password does not match with this user.',
        )
        break

      default:
        break
    }

    setOpen(true)

    const timeout = setTimeout(() => setOpen(false), 5000)

    return () => {
      clearTimeout(timeout)
      setOpen(oldOpen => {
        if (oldOpen) return false

        return oldOpen
      })
    }
  }, [error])

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

        <Notification
          open={open}
          title={notificationTitle}
          description={notificationDescription}
          onClose={() => setOpen(false)}
        />
      </section>
    </VisitantLayout>
  )
}

export default SignIn
