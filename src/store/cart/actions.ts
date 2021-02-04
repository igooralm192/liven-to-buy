import { CartActions, CartActionTypes, CartProduct } from './types'

export const cartRequest = (): CartActions => {
  return {
    type: CartActionTypes.CART_REQUEST,
  }
}

export const cartFailure = (error: string): CartActions => {
  return {
    type: CartActionTypes.CART_FAILURE,
    payload: {
      error,
    },
  }
}

export const addProduct = (productId: string, quantity = 1): CartActions => {
  return {
    type: CartActionTypes.ADD_PRODUCT,
    payload: { productId, quantity },
  }
}

export const removeProduct = (productId: string): CartActions => {
  return {
    type: CartActionTypes.REMOVE_PRODUCT,
    payload: { productId },
  }
}

const updateQuantity = (productId: string, quantity: number): CartActions => {
  return {
    type: CartActionTypes.UPDATE_QUANTITY,
    payload: { productId, quantity },
  }
}

export const incrementQuantity = (product: CartProduct): CartActions =>
  updateQuantity(product.id, product.quantity + 1)

export const decrementQuantity = (product: CartProduct): CartActions =>
  updateQuantity(product.id, product.quantity - 1)

export const addCoupon = (coupon: string, discount: number): CartActions => {
  return {
    type: CartActionTypes.ADD_COUPON,
    payload: { coupon, discount },
  }
}

export const removeCoupon = (): CartActions => {
  return {
    type: CartActionTypes.REMOVE_COUPON,
  }
}

export const addPaymentMethod = (
  last4Digits: string,
  expireMonth: number,
  expireYear: number,
): CartActions => {
  return {
    type: CartActionTypes.ADD_PAYMENT_METHOD,
    payload: { last4Digits, expireMonth, expireYear },
  }
}

export const removePaymentMethod = (): CartActions => {
  return {
    type: CartActionTypes.REMOVE_PAYMENT_METHOD,
  }
}

export const hideError = (): CartActions => {
  return {
    type: CartActionTypes.HIDE_ERROR,
  }
}
