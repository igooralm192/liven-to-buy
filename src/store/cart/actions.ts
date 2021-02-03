import { CartActions, CartActionTypes } from './types'

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

export const addProduct = (productId: string): CartActions => {
  return {
    type: CartActionTypes.ADD_PRODUCT,
    payload: { productId },
  }
}

export const removeProduct = (productId: string): CartActions => {
  return {
    type: CartActionTypes.REMOVE_PRODUCT,
    payload: { productId },
  }
}

export const hideError = (): CartActions => {
  return {
    type: CartActionTypes.HIDE_ERROR,
  }
}
