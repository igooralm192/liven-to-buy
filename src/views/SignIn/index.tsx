import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './styles.css'

import { LoginErrorsCode } from '../../api/auth/types'

import Button from '../../components/Button'

import useNotification from '../../hooks/useNotification'

import { AppState } from '../../store'
import { hideError } from '../../store/auth/actions'
import { authenticateUser } from '../../store/auth/thunks'
import Input from '../../components/Input'

const SignIn: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { isFetching, error } = useSelector((state: AppState) => state.auth)

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

  const { notification, showNotification, hideNotification } = useNotification()

  function handleSubmitForm(email: string, password: string) {
    dispatch(authenticateUser(email, password))
  }

  useEffect(() => {
    if (!error) {
      hideNotification()
      return
    }

    switch (error) {
      case LoginErrorsCode.INCORRECT_EMAIL:
        showNotification('Incorrect e-mail', 'This user does not exists.')
        break

      case LoginErrorsCode.INCORRECT_PASSWORD:
        showNotification(
          'Incorrect password',
          'This password does not match with this user.',
        )
        break

      default:
        break
    }
  }, [error, showNotification, hideNotification])

  useEffect(() => {
    if (notification.open) return

    dispatch(hideError())
  }, [notification.open, dispatch])

  return (
    <section id="sign-in-container">
      <div className="back">
        <FaArrowLeft onClick={() => history.goBack()} />
      </div>

      <div className="title">Sign in</div>

      <div className="logged">
        Don&apos;t have an account?
        <Link to="/sign-up"> Sign up.</Link>
      </div>

      <form id="sign-in-form" className="form">
        <Input
          name="email"
          type="text"
          placeholder="E-mail"
          value={values.email}
          onChange={handleChange}
          icon={FaEnvelope}
          error={errors.email}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          icon={FaLock}
          error={errors.password}
        />
      </form>

      <div id="sign-in-actions" className="actions">
        <Link to="/sign-in">
          <Button
            className="action"
            onClick={() => submitForm()}
            disabled={isFetching}
          >
            {isFetching ? `...` : `Sign in`}
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default SignIn
