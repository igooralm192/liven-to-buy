import { createStore, combineReducers, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'

import authReducer from './auth/reducer'
import { AuthState } from './auth/types'

import productsReducer from './products/reducer'
import { ProductsState } from './products/types'

import cartReducer from './cart/reducer'
import { CartState } from './cart/types'

export interface AppState {
  auth: AuthState
  products: ProductsState
  cart: CartState
}

const rootReducer = combineReducers<AppState>({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

export default store
