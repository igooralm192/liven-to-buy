import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'

export const CartActionTypes = {
  CART_REQUEST: 'CART_REQUEST',
  CART_FAILURE: 'CART_FAILURE',

  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',

  HIDE_ERROR: 'HIDE_ERROR',
} as const

type CartActionTypes = typeof CartActionTypes[keyof typeof CartActionTypes]

export interface CartState {
  isFetching: boolean
  error?: string

  products: string[]
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

export interface AddProductAction {
  type: typeof CartActionTypes.ADD_PRODUCT
  payload: {
    productId: string
  }
}

export interface RemoveProductAction {
  type: typeof CartActionTypes.REMOVE_PRODUCT
  payload: {
    productId: string
  }
}

export interface HideErrorAction {
  type: typeof CartActionTypes.HIDE_ERROR
}

// export type GetCartThunkAction = ThunkAction<
//   Promise<void>,
//   AppState,
//   void,
//   CartActions
// >

export type CartActions =
  | CartRequestAction
  | CartFailureAction
  | AddProductAction
  | RemoveProductAction
  | HideErrorAction
