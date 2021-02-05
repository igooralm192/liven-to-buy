import { paymentApi } from '../../services/api'
import { CartPaymentMethod } from '../../store/cart/types'

export const makePayment = async (
  paymentMethod: CartPaymentMethod,
): Promise<void> => paymentApi.pay()
