import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'

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

  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',

  LOGOUT_USER: 'LOGOUT_USER',

  HIDE_ERROR: 'HIDE_ERROR',
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

export interface CreateUserRequestAction {
  type: typeof AuthActionTypes.CREATE_USER_REQUEST
}

export interface CreateUserSuccessAction {
  type: typeof AuthActionTypes.CREATE_USER_SUCCESS
  payload: {
    user: User
  }
}
export interface CreateUserFailureAction {
  type: typeof AuthActionTypes.CREATE_USER_FAILURE
  payload: {
    error: string
  }
}

export interface LogoutUserAction {
  type: typeof AuthActionTypes.LOGOUT_USER
}

export interface HideErrorAction {
  type: typeof AuthActionTypes.HIDE_ERROR
}

export type AuthenticateUserThunkAction = ThunkAction<
  Promise<void>,
  AppState,
  void,
  AuthActions
>

export type CreateUserThunkAction = ThunkAction<
  Promise<void>,
  AuthState,
  void,
  AuthActions
>

export type AuthActions =
  | AuthenticateUserRequestAction
  | AuthenticateUserSuccessAction
  | AuthenticateUserFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | LogoutUserAction
  | HideErrorAction
