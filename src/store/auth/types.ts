import { ThunkAction } from 'redux-thunk'

export interface User {
  name: string
  email: string
  password: string
  birthdate: Date
  cpf: string
}

export const AuthActionTypes = {
  AUTHENTICATE_USER_REQUEST: 'AUTHENTICATE_USER_REQUEST',
  AUTHENTICATE_USER_SUCCESS: 'AUTHENTICATE_USER_SUCCESS',
  AUTHENTICATE_USER_FAILURE: 'AUTHENTICATE_USER_FAILURE',
} as const

type AuthActionTypes = typeof AuthActionTypes[keyof typeof AuthActionTypes]

export interface AuthState {
  isFetching: boolean
  error?: string
  isAuthenticated: boolean
  loggedUser?: User
}

export interface AuthenticateUserRequestAction {
  type: typeof AuthActionTypes.AUTHENTICATE_USER_REQUEST
}

export interface AuthenticateUserSuccessAction {
  type: typeof AuthActionTypes.AUTHENTICATE_USER_SUCCESS
  payload: {
    user: User
  }
}
export interface AuthenticateUserFailureAction {
  type: typeof AuthActionTypes.AUTHENTICATE_USER_FAILURE
  payload: {
    error: string
  }
}

export type AuthenticateUserThunkAction = ThunkAction<
  Promise<void>,
  AuthState,
  void,
  AuthActions
>

export type AuthActions =
  | AuthenticateUserRequestAction
  | AuthenticateUserSuccessAction
  | AuthenticateUserFailureAction
