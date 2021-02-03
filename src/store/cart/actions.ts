import { Product } from '../products/types'
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

export const incrementQuantity = (product: Product): CartActions =>
  updateQuantity(product.id, product.quantity + 1)

export const decrementQuantity = (product: Product): CartActions =>
  updateQuantity(product.id, product.quantity - 1)

export const hideError = (): CartActions => {
  return {
    type: CartActionTypes.HIDE_ERROR,
  }
}
