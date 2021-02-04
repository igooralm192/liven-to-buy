import React from 'react'

import { TiSortNumerically } from 'react-icons/ti'
import { MdDateRange } from 'react-icons/md'
import { BiBarcodeReader } from 'react-icons/bi'

import { useFormik } from 'formik'
import { isAfter, isDate, parse } from 'date-fns'
import * as Yup from 'yup'

import TextMask from 'react-text-mask'

import './styles.css'

interface Props {
  onAddPaymentMethod: (
    cardNumber: string,
    cardExpireDate: string,
    cardCvv: string,
  ) => void
}

const cardNumberMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const CartPaymentMethodForm: React.FC<Props> = ({ onAddPaymentMethod }) => {
  const { values, errors, handleChange, submitForm } = useFormik({
    initialValues: {
      number: '',
      date: '',
      cvv: '',
    },
    validationSchema: Yup.object({
      number: Yup.string()
        .required('Required field.')
        .min(19, 'Invalid card number.'),
      date: Yup.date()
        .transform((_, originalValue: string) => {
          const parsedDate = parse(originalValue, 'MM/yy', new Date())

          if (isDate(parsedDate) && isAfter(parsedDate, new Date()))
            return parsedDate

          return 'invalid'
        })
        .typeError('Invalid expire date.')
        .required('Required field.'),
      cvv: Yup.string().required('Required field.').min(3, 'Invalid CVV.'),
    }),
    onSubmit: ({ number, date, cvv }) => handleSubmitForm(number, date, cvv),
    validateOnChange: false,
  })

  function handleSubmitForm(number: string, date: string, cvv: string) {
    onAddPaymentMethod(number, date, cvv)
  }

  return (
    <form className="cart payment-method-form" autoComplete="off">
      <div className="cart payment-method-form inputs">
        <fieldset className={`form-control ${errors.number ? 'error' : ''}`}>
          <TextMask
            name="number"
            type="text"
            mask={cardNumberMask}
            guide={false}
            autoComplete="off"
            placeholder="Card number"
            value={values.number}
            onChange={handleChange}
          />
          <TiSortNumerically className="icon" />
          <span className="error-message">{errors.number}</span>
        </fieldset>

        <fieldset className={`form-control ${errors.date ? 'error' : ''}`}>
          <TextMask
            name="date"
            type="text"
            mask={[/[0-1]/, /[0-9]/, '/', /\d/, /\d/]}
            guide={false}
            placeholder="Expire date"
            autoComplete="new-password"
            value={values.date}
            onChange={handleChange}
          />
          <MdDateRange className="icon" />
          <span className="error-message">{errors.date}</span>
        </fieldset>

        <fieldset className={`form-control ${errors.cvv ? 'error' : ''}`}>
          <TextMask
            name="cvv"
            type="text"
            mask={[/\d/, /\d/, /\d/]}
            guide={false}
            placeholder="Card CVV"
            value={values.cvv}
            onChange={handleChange}
          />
          <BiBarcodeReader className="icon" />
          <span className="error-message">{errors.cvv}</span>
        </fieldset>
      </div>

      <button
        type="button"
        className="cart payment-method-form action"
        onClick={submitForm}
      >
        Add
      </button>
    </form>
  )
}

export default CartPaymentMethodForm
