import { createStore, combineReducers, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'

import authReducer from './auth/reducer'
import { AuthState } from './auth/types'

export interface AppState {
  auth: AuthState
}

const rootReducer = combineReducers<AppState>({
  auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

export default store
