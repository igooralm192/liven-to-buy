import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './styles.css'

import Notification from '../../components/Notification'

import { LoginErrorsCode } from '../../api/auth/types'

import { AppState } from '../../store'
import { hideError } from '../../store/auth/actions'
import { authenticateUser } from '../../store/auth/thunks'

const SignIn: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { isFetching, error, isAuthenticated } = useSelector(
    (state: AppState) => state.auth,
  )

  const { values, errors, handleChange, submitForm } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email.').required('Required field.'),
      password: Yup.string().required('Required field.'),
    }),
    onSubmit: ({ email, password }) => handleSubmitForm(email, password),
    validateOnChange: false,
  })

  const [notificationOpen, setNotificationOpen] = useState(false)
  const [notificationTitle, setNotificationTitle] = useState('')
  const [notificationDescription, setNotificationDescription] = useState('')

  function closeNotification() {
    dispatch(hideError())
    setNotificationOpen(oldOpen => {
      if (oldOpen) return false

      return oldOpen
    })
  }

  function handleSubmitForm(email: string, password: string) {
    dispatch(authenticateUser(email, password))
  }

  useEffect(() => {
    if (!isAuthenticated) return

    history.push('/products')
  }, [isAuthenticated, history])

  useEffect(() => {
    if (!error) return () => {}

    switch (error) {
      case LoginErrorsCode.INCORRECT_EMAIL:
        setNotificationTitle('Incorrect e-mail')
        setNotificationDescription('This user does not exists.')
        break

      case LoginErrorsCode.INCORRECT_PASSWORD:
        setNotificationTitle('Incorrect password')
        setNotificationDescription(
          'This password does not match with this user.',
        )
        break

      default:
        break
    }

    setNotificationOpen(true)

    const timeout = setTimeout(() => closeNotification(), 5000)

    return () => {
      clearTimeout(timeout)
      closeNotification()
    }
  }, [error])

  return (
    <section className="sign-in container">
      <div className="sign-in back">
        <FaArrowLeft onClick={() => history.goBack()} />
      </div>

      <div className="sign-in title">Sign in</div>

      <div className="sign-in logged">
        Don&apos;t have an account?
        <Link to="/sign-up"> Sign up.</Link>
      </div>

      <form className="sign-in form">
        <fieldset
          className={`sign-in form-control ${errors.email ? 'error' : ''}`}
        >
          <input
            name="email"
            type="text"
            placeholder="E-mail"
            value={values.email}
            onChange={handleChange}
          />
          <FaEnvelope className="icon" />
          <span className="error-message">{errors.email}</span>
        </fieldset>
        <fieldset
          className={`sign-in form-control ${errors.password ? 'error' : ''}`}
        >
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          <FaLock className="icon" />
          <span className="error-message">{errors.password}</span>
        </fieldset>
      </form>

      <div className="sign-in actions">
        <Link to="/sign-in">
          <button
            type="button"
            className="sign-in action"
            onClick={() => submitForm()}
            disabled={isFetching}
          >
            {isFetching ? `...` : `Sign in`}
          </button>
        </Link>
      </div>

      <Notification
        open={notificationOpen}
        title={notificationTitle}
        description={notificationDescription}
        onClose={closeNotification}
      />
    </section>
  )
}

export default SignIn
