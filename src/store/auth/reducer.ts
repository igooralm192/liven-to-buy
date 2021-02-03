import { AuthState, AuthActions, AuthActionTypes, User } from './types'

const LOGGED_USER_KEY = '@liven-to-buy/loggedUser'

const serializedUser = localStorage.getItem(LOGGED_USER_KEY)

const localUser: User | undefined = serializedUser
  ? JSON.parse(serializedUser)
  : undefined

const initialState: AuthState = {
  isFetching: false,
  isAuthenticated: localUser !== undefined,
  loggedUser: localUser,
}

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      }

    case AuthActionTypes.AUTHENTICATE_USER_SUCCESS:
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(action.payload.user))

      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        loggedUser: action.payload.user,
      }

    case AuthActionTypes.AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }

    case AuthActionTypes.CREATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      }

    case AuthActionTypes.CREATE_USER_SUCCESS:
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(action.payload.user))

      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        loggedUser: action.payload.user,
      }

    case AuthActionTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }

    case AuthActionTypes.HIDE_ERROR:
      return {
        ...state,
        error: undefined,
      }

    default:
      return state
  }
}

export default authReducer
