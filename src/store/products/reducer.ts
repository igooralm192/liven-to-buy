import {
  ProductsActions,
  ProductsState,
  ProductsActionTypes,
  Product,
} from './types'

const initialState: ProductsState = {
  isFetching: false,
  byId: {},
}

const productsReducer = (
  state = initialState,
  action: ProductsActions,
): ProductsState => {
  switch (action.type) {
    case ProductsActionTypes.PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      }

    case ProductsActionTypes.PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }

    case ProductsActionTypes.SET_PRODUCTS: {
      const { products } = action.payload

      const productsById: {
        [key: string]: Product
      } = products.reduce(
        (map, product) => ({ ...map, [product.id]: product }),
        {},
      )

      return {
        ...state,
        isFetching: false,
        byId: productsById,
      }
    }

    case ProductsActionTypes.HIDE_ERROR:
      return {
        ...state,
        error: undefined,
      }

    default:
      return state
  }
}

export default productsReducer
