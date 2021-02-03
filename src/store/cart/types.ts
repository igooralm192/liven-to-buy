import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'

export const CartActionTypes = {
  CART_REQUEST: 'CART_REQUEST',
  CART_FAILURE: 'CART_FAILURE',

  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',

  HIDE_ERROR: 'HIDE_ERROR',
} as const

type CartActionTypes = typeof CartActionTypes[keyof typeof CartActionTypes]

export interface CartProduct {
  id: string
  quantity: number
}

export interface CartState {
  isFetching: boolean
  error?: string

  products: CartProduct[]
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
    quantity?: number
  }
}

export interface RemoveProductAction {
  type: typeof CartActionTypes.REMOVE_PRODUCT
  payload: {
    productId: string
  }
}

export interface UpdateQuantityAction {
  type: typeof CartActionTypes.UPDATE_QUANTITY
  payload: {
    productId: string
    quantity: number
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
  | UpdateQuantityAction
  | HideErrorAction
