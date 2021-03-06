import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaUser,
  FaIdCard,
  FaBirthdayCake,
} from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './styles.css'

import { RegisterErrorsCode } from '../../api/auth/types'

import useNotification from '../../hooks/useNotification'

import { AppState } from '../../store'
import { hideError } from '../../store/auth/actions'
import { createUser } from '../../store/auth/thunks'

const SignUp: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { isFetching, error } = useSelector((state: AppState) => state.auth)

  const { values, errors, handleChange, submitForm } = useFormik({
    initialValues: {
      name: '',
      email: '',
      cpf: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required field.'),
      email: Yup.string().email('Invalid email.').required('Required field.'),
      cpf: Yup.string().required('Required field.'),
      birthdate: Yup.date().required('Required field.'),
      password: Yup.string().required('Required field.'),
      confirmPassword: Yup.string()
        .required('Required field.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: ({ name, email, cpf, birthdate, password }) =>
      handleSubmitForm(name, email, cpf, birthdate, password),
    validateOnChange: false,
  })

  const { notification, showNotification, hideNotification } = useNotification()

  function handleSubmitForm(
    name: string,
    email: string,
    cpf: string,
    birthdate: string,
    password: string,
  ) {
    dispatch(createUser(name, email, cpf, new Date(birthdate), password))
  }

  useEffect(() => {
    if (!error) {
      hideNotification()
      return
    }

    switch (error) {
      case RegisterErrorsCode.USER_EXISTS:
        showNotification('Found user', 'This user already exists.')
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
    <section className="sign-up container">
      <div className="sign-up back">
        <FaArrowLeft onClick={() => history.goBack()} />
      </div>

      <div className="sign-up title">Sign up</div>

      <div className="sign-up logged">
        Already have an account?
        <Link to="/sign-in"> Sign in.</Link>
      </div>

      <form className="sign-up form">
        <fieldset
          className={`sign-up form-control ${errors.name ? 'error' : ''}`}
        >
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
          <FaUser className="icon" />
          <span className="error-message">{errors.name}</span>
        </fieldset>
        <fieldset
          className={`sign-up form-control ${errors.email ? 'error' : ''}`}
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
          className={`sign-up form-control ${errors.cpf ? 'error' : ''}`}
        >
          <input
            name="cpf"
            type="text"
            placeholder="CPF"
            value={values.cpf}
            onChange={handleChange}
          />
          <FaIdCard className="icon" />
          <span className="error-message">{errors.cpf}</span>
        </fieldset>
        <fieldset
          className={`sign-up form-control ${errors.birthdate ? 'error' : ''}`}
        >
          <input
            name="birthdate"
            type="date"
            placeholder="Birth Date"
            value={values.birthdate}
            onChange={handleChange}
          />
          <FaBirthdayCake className="icon" />
          <span className="error-message">{errors.birthdate}</span>
        </fieldset>
        <fieldset
          className={`sign-up form-control ${errors.password ? 'error' : ''}`}
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
        <fieldset
          className={`sign-up form-control ${
            errors.confirmPassword ? 'error' : ''
          }`}
        >
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <FaLock className="icon" />
          <span className="error-message">{errors.confirmPassword}</span>
        </fieldset>
      </form>

      <div className="sign-up actions">
        <Link to="/sign-up">
          <button
            type="button"
            className="sign-up action"
            onClick={() => submitForm()}
            disabled={isFetching}
          >
            {isFetching ? `...` : `Sign up`}
          </button>
        </Link>
      </div>
    </section>
  )
}

export default SignUp
