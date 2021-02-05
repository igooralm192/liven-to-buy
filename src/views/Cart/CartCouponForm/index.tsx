import React, { useState } from 'react'
import { FaTicketAlt } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './styles.css'

interface Props {
  onAddCoupon: (coupon: string) => void
}

const CartCouponForm: React.FC<Props> = ({ onAddCoupon }) => {
  const { values, errors, handleChange, submitForm } = useFormik({
    initialValues: {
      coupon: '',
    },
    validationSchema: Yup.object({
      coupon: Yup.string().uppercase().required('Required field.'),
    }),
    onSubmit: ({ coupon }) => handleSubmitForm(coupon),
    validateOnChange: false,
  })

  function handleSubmitForm(coupon: string) {
    onAddCoupon(coupon)
  }

  return (
    <form className="cart coupon-form">
      <fieldset className={`form-control ${errors.coupon ? 'error' : ''}`}>
        <input
          name="coupon"
          type="text"
          placeholder="Coupon"
          value={values.coupon}
          onChange={e => {
            e.target.value = e.target.value.toUpperCase()
            return handleChange(e)
          }}
        />
        <FaTicketAlt className="icon" />
        <span className="error-message">{errors.coupon}</span>
      </fieldset>

      <button
        type="button"
        className="cart coupon-form action"
        onClick={submitForm}
      >
        Add
      </button>
    </form>
  )
}

export default CartCouponForm
