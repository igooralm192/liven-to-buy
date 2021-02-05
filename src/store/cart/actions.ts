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

export const carthideError = (): CartActions => {
  return {
    type: CartActionTypes.CART_HIDE_ERROR,
  }
}

export const loadCartProducts = (): CartActions => {
  return {
    type: CartActionTypes.LOAD_CART_PRODUCTS,
  }
}

export const clearCartProducts = (): CartActions => {
  return {
    type: CartActionTypes.CLEAR_CART_PRODUCTS,
  }
}

export const addCartProduct = (
  productId: string,
  quantity = 1,
): CartActions => {
  return {
    type: CartActionTypes.ADD_CART_PRODUCT,
    payload: { productId, quantity },
  }
}

export const removeCartProduct = (productId: string): CartActions => {
  return {
    type: CartActionTypes.REMOVE_CART_PRODUCT,
    payload: { productId },
  }
}

const updateCartProductQuantity = (
  productId: string,
  quantity: number,
): CartActions => {
  return {
    type: CartActionTypes.UPDATE_CART_PRODUCT_QUANTITY,
    payload: { productId, quantity },
  }
}

export const incrementCartProductQuantity = (
  product: CartProduct,
): CartActions => updateCartProductQuantity(product.id, product.quantity + 1)

export const decrementCartProductQuantity = (
  product: CartProduct,
): CartActions => updateCartProductQuantity(product.id, product.quantity - 1)

export const addCartCoupon = (
  coupon: string,
  discount: number,
): CartActions => {
  return {
    type: CartActionTypes.ADD_CART_COUPON,
    payload: { coupon, discount },
  }
}

export const removeCartCoupon = (): CartActions => {
  return {
    type: CartActionTypes.REMOVE_CART_COUPON,
  }
}

export const addCartPaymentMethod = (
  last4Digits: string,
  expireMonth: number,
  expireYear: number,
): CartActions => {
  return {
    type: CartActionTypes.ADD_CART_PAYMENT_METHOD,
    payload: { last4Digits, expireMonth, expireYear },
  }
}

export const removeCartPaymentMethod = (): CartActions => {
  return {
    type: CartActionTypes.REMOVE_CART_PAYMENT_METHOD,
  }
}

export const setCheckout = (checkout: boolean): CartActions => {
  return {
    type: CartActionTypes.SET_CHECKOUT,
    payload: {
      checkout,
    },
  }
}
