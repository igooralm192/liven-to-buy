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

export const createUserRequest = (): AuthActions => {
  return {
    type: AuthActionTypes.CREATE_USER_REQUEST,
  }
}

export const createUserSuccess = (user: User): AuthActions => {
  return {
    type: AuthActionTypes.CREATE_USER_SUCCESS,
    payload: { user },
  }
}

export const createUserFailure = (error: string): AuthActions => {
  return {
    type: AuthActionTypes.CREATE_USER_FAILURE,
    payload: { error },
  }
}

export const logoutUser = (): AuthActions => {
  return {
    type: AuthActionTypes.LOGOUT_USER,
  }
}

export const hideError = (): AuthActions => {
  return {
    type: AuthActionTypes.HIDE_ERROR,
  }
}
