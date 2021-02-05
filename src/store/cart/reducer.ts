import { CartActions, CartState, CartActionTypes, CartProduct } from './types'

const CART_PRODUCTS_KEY = '@liven-to-buy/cart-products'

const initialState: CartState = {
  isFetching: false,
  products: [],
  checkout: false,
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

    case CartActionTypes.CART_HIDE_ERROR:
      return {
        ...state,
        error: undefined,
      }

    case CartActionTypes.LOAD_CART_PRODUCTS: {
      const serializedCartProducts = localStorage.getItem(CART_PRODUCTS_KEY)

      const cartProducts: CartProduct[] = serializedCartProducts
        ? JSON.parse(serializedCartProducts)
        : []

      return {
        ...state,
        products: cartProducts,
      }
    }

    case CartActionTypes.CLEAR_CART_PRODUCTS: {
      localStorage.removeItem(CART_PRODUCTS_KEY)

      return {
        ...state,
        products: [],
        checkout: false,
      }
    }

    case CartActionTypes.ADD_CART_PRODUCT: {
      const { productId, quantity } = action.payload

      const findProduct = state.products.find(
        product => product.id === productId,
      )

      if (findProduct) return state

      const updatedProducts = [
        ...state.products,
        {
          id: productId,
          quantity: quantity ?? 1,
        },
      ]

      localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(updatedProducts))

      return {
        ...state,
        products: updatedProducts,
      }
    }

    case CartActionTypes.REMOVE_CART_PRODUCT: {
      const { productId } = action.payload

      const filteredProducts = state.products.filter(
        product => product.id !== productId,
      )

      localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(filteredProducts))

      return {
        ...state,
        products: filteredProducts,
      }
    }

    case CartActionTypes.UPDATE_CART_PRODUCT_QUANTITY: {
      const { productId, quantity } = action.payload

      const findProductIndex = state.products.findIndex(
        product => product.id === productId,
      )

      if (findProductIndex === -1) return state

      const updatedProducts = [...state.products]
      updatedProducts[findProductIndex].quantity = quantity

      localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(updatedProducts))

      return {
        ...state,
        products: updatedProducts,
      }
    }

    case CartActionTypes.ADD_CART_COUPON:
      return {
        ...state,
        coupon: {
          code: action.payload.coupon,
          discount: action.payload.discount,
        },
      }

    case CartActionTypes.REMOVE_CART_COUPON:
      return {
        ...state,
        coupon: undefined,
      }

    case CartActionTypes.ADD_CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: { ...action.payload },
      }

    case CartActionTypes.REMOVE_CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: undefined,
      }

    case CartActionTypes.SET_CHECKOUT:
      return {
        ...state,
        checkout: action.payload.checkout,
      }

    default:
      return state
  }
}

export default cartReducer
