import { paymentApi } from '../../services/api'
import { CartPaymentMethod } from '../../store/cart/types'

export const makePayment = async ({
  last4Digits,
  expireMonth,
  expireYear,
}: CartPaymentMethod): Promise<void> =>
  paymentApi.pay(last4Digits, expireMonth, expireYear)
