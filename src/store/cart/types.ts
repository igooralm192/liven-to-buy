import { ThunkAction } from 'redux-thunk'

import { AppState } from '..'

export const CartActionTypes = {
  CART_REQUEST: 'CART_REQUEST',
  CART_FAILURE: 'CART_FAILURE',
  CART_HIDE_ERROR: 'CART_HIDE_ERROR',

  LOAD_CART_PRODUCTS: 'LOAD_CART_PRODUCTS',
  CLEAR_CART_PRODUCTS: 'CLEAR_CART_PRODUCTS',

  ADD_CART_PRODUCT: 'ADD_CART_PRODUCT',
  REMOVE_CART_PRODUCT: 'REMOVE_CART_PRODUCT',
  UPDATE_CART_PRODUCT_QUANTITY: 'UPDATE_CART_PRODUCT_QUANTITY',

  ADD_CART_COUPON: 'ADD_CART_COUPON',
  REMOVE_CART_COUPON: 'REMOVE_CART_COUPON',

  ADD_CART_PAYMENT_METHOD: 'ADD_CART_PAYMENT_METHOD',
  REMOVE_CART_PAYMENT_METHOD: 'REMOVE_CART_PAYMENT_METHOD',

  SET_CHECKOUT: 'SET_CHECKOUT',
} as const

type CartActionTypes = typeof CartActionTypes[keyof typeof CartActionTypes]

export interface CartProduct {
  id: string
  quantity: number
}

export interface CartCoupon {
  code: string
  discount: number
}

export interface CartPaymentMethod {
  last4Digits: string
  expireMonth: number
  expireYear: number
}

export interface CartState {
  isFetching: boolean
  error?: string

  products: CartProduct[]
  coupon?: CartCoupon
  paymentMethod?: CartPaymentMethod
  checkout: boolean
}

export interface CartRequestAction {
  type: typeof CartActionTypes.CART_REQUEST
}

export interface CartFailureAction {
  type: typeof CartActionTypes.CART_FAILURE
  payload: {
    error: string
  }
}

export interface CartHideErrorAction {
  type: typeof CartActionTypes.CART_HIDE_ERROR
}

export interface LoadCartProductsAction {
  type: typeof CartActionTypes.LOAD_CART_PRODUCTS
}

export interface ClearCartProductsAction {
  type: typeof CartActionTypes.CLEAR_CART_PRODUCTS
}

export interface AddCartProductAction {
  type: typeof CartActionTypes.ADD_CART_PRODUCT
  payload: {
    productId: string
    quantity?: number
  }
}

export interface RemoveCartProductAction {
  type: typeof CartActionTypes.REMOVE_CART_PRODUCT
  payload: {
    productId: string
  }
}

export interface UpdateCartProductQuantityAction {
  type: typeof CartActionTypes.UPDATE_CART_PRODUCT_QUANTITY
  payload: {
    productId: string
    quantity: number
  }
}

export interface AddCartCouponAction {
  type: typeof CartActionTypes.ADD_CART_COUPON
  payload: {
    coupon: string
    discount: number
  }
}

export interface RemoveCartCouponAction {
  type: typeof CartActionTypes.REMOVE_CART_COUPON
}

export interface AddCartPaymentMethodAction {
  type: typeof CartActionTypes.ADD_CART_PAYMENT_METHOD
  payload: {
    last4Digits: string
    expireMonth: number
    expireYear: number
  }
}

export interface RemoveCartPaymentMethodAction {
  type: typeof CartActionTypes.REMOVE_CART_PAYMENT_METHOD
}

export interface SetCheckoutAction {
  type: typeof CartActionTypes.SET_CHECKOUT
  payload: {
    checkout: boolean
  }
}

export type CheckoutCartThunkAction = ThunkAction<
  Promise<void>,
  AppState,
  void,
  CartActions
>

export type CartActions =
  | CartRequestAction
  | CartFailureAction
  | CartHideErrorAction
  | LoadCartProductsAction
  | ClearCartProductsAction
  | AddCartProductAction
  | RemoveCartProductAction
  | UpdateCartProductQuantityAction
  | AddCartCouponAction
  | RemoveCartCouponAction
  | AddCartPaymentMethodAction
  | RemoveCartPaymentMethodAction
  | SetCheckoutAction
