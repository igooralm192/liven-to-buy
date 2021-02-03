import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'

export const ProductsActionTypes = {
  PRODUCTS_REQUEST: 'PRODUCTS_REQUEST',
  PRODUCTS_FAILURE: 'PRODUCTS_FAILURE',

  SET_PRODUCTS: 'SET_PRODUCTS',

  HIDE_ERROR: 'HIDE_ERROR',
} as const

type ProductsActionTypes = typeof ProductsActionTypes[keyof typeof ProductsActionTypes]

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  createdAt: Date
}

export interface ProductsState {
  isFetching: boolean
  error?: string
  byId: {
    [key: string]: Product
  }
}

export interface ProductsRequestAction {
  type: typeof ProductsActionTypes.PRODUCTS_REQUEST
}

export interface ProductsFailureAction {
  type: typeof ProductsActionTypes.PRODUCTS_FAILURE
  payload: {
    error: string
  }
}

export interface SetProductsAction {
  type: typeof ProductsActionTypes.SET_PRODUCTS
  payload: {
    products: Product[]
  }
}

export interface HideErrorAction {
  type: typeof ProductsActionTypes.HIDE_ERROR
}

export type GetProductsThunkAction = ThunkAction<
  Promise<void>,
  AppState,
  void,
  ProductsActions
>

export type ProductsActions =
  | ProductsRequestAction
  | ProductsFailureAction
  | SetProductsAction
  | HideErrorAction
