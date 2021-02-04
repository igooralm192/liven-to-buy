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
      const { productId, quantity } = action.payload

      const findProduct = state.products.find(
        product => product.id === productId,
      )

      if (findProduct) return state

      return {
        ...state,
        products: [
          ...state.products,
          {
            id: productId,
            quantity: quantity ?? 1,
          },
        ],
      }
    }

    case CartActionTypes.REMOVE_PRODUCT: {
      const { productId } = action.payload

      const filteredProducts = state.products.filter(
        product => product.id !== productId,
      )

      return {
        ...state,
        products: filteredProducts,
      }
    }

    case CartActionTypes.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload

      const findProductIndex = state.products.findIndex(
        product => product.id === productId,
      )

      if (findProductIndex === -1) return state

      const updatedProducts = [...state.products]
      updatedProducts[findProductIndex].quantity = quantity

      return {
        ...state,
        products: updatedProducts,
      }
    }

    case CartActionTypes.ADD_COUPON:
      return {
        ...state,
        coupon: {
          code: action.payload.coupon,
          discount: action.payload.discount,
        },
      }

    case CartActionTypes.REMOVE_COUPON:
      return {
        ...state,
        coupon: undefined,
      }

    case CartActionTypes.ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: { ...action.payload },
      }

    case CartActionTypes.REMOVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: undefined,
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
