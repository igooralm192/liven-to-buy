import { AuthActions, AuthActionTypes, User } from './types'

export const authenticateUserRequest = (): AuthActions => {
  return {
    type: AuthActionTypes.AUTHENTICATE_USER_REQUEST,
  }
}

export const authenticateUserSuccess = (user: User): AuthActions => {
  return {
    type: AuthActionTypes.AUTHENTICATE_USER_SUCCESS,
    payload: { user },
  }
}

export const authenticateUserFailure = (error: string): AuthActions => {
  return {
    type: AuthActionTypes.AUTHENTICATE_USER_FAILURE,
    payload: { error },
  }
}

export const hideError = (): AuthActions => {
  return {
    type: AuthActionTypes.HIDE_ERROR,
  }
}
