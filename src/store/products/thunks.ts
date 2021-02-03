import { productsFailure, productsRequest, setProducts } from './actions'
import { GetProductsThunkAction } from './types'

import * as api from '../../api/products'

export const getProducts = (): GetProductsThunkAction => {
  return async (dispatch, getState) => {
    const state = getState()

    if (state.products.isFetching) return

    dispatch(productsRequest())

    try {
      const products = await api.getProducts()

      dispatch(setProducts(products))
    } catch (err) {
      dispatch(productsFailure(err.message))
    }
  }
}
