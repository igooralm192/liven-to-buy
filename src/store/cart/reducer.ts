import { CartActions, CartState, CartActionTypes } from './types'

const initialState: CartState = {
  isFetching: false,
  products: [],
}

const cartReducer = (state = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case CartActionTypes.CART_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      }

    case CartActionTypes.CART_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }

    case CartActionTypes.ADD_PRODUCT: {
      const { productId } = action.payload

      const findProduct = state.products.find(product => product === productId)

      if (findProduct) return state

      return {
        ...state,
        products: [...state.products, productId],
      }
    }

    case CartActionTypes.REMOVE_PRODUCT: {
      const { productId } = action.payload

      const filteredProducts = state.products.filter(
        product => product !== productId,
      )

      return {
        ...state,
        products: filteredProducts,
      }
    }

    case CartActionTypes.HIDE_ERROR:
      return {
        ...state,
        error: undefined,
      }

    default:
      return state
  }
}

export default cartReducer
