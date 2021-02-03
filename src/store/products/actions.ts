import { Product, ProductsActions, ProductsActionTypes } from './types'

export const productsRequest = (): ProductsActions => {
  return {
    type: ProductsActionTypes.PRODUCTS_REQUEST,
  }
}

export const productsFailure = (error: string): ProductsActions => {
  return {
    type: ProductsActionTypes.PRODUCTS_FAILURE,
    payload: {
      error,
    },
  }
}

export const setProducts = (products: Product[]): ProductsActions => {
  return {
    type: ProductsActionTypes.SET_PRODUCTS,
    payload: { products },
  }
}

export const hideError = (): ProductsActions => {
  return {
    type: ProductsActionTypes.HIDE_ERROR,
  }
}
