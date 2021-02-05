import { cartFailure, cartRequest } from './actions'
import { CheckoutCartThunkAction } from './types'

import * as api from '../../api/payment'
import { PaymentErrorsCode } from '../../api/payment/types'

export const checkoutCart = (): CheckoutCartThunkAction => {
  return async (dispatch, getState) => {
    const { isFetching, paymentMethod } = getState().cart

    if (isFetching) return

    if (!paymentMethod) {
      dispatch(cartFailure(PaymentErrorsCode.REQUIRED_PAYMENT_METHOD))
      return
    }

    dispatch(cartRequest())

    try {
      await api.makePayment(paymentMethod)
    } catch (err) {
      dispatch(cartFailure(err.message))
    }
  }
}
