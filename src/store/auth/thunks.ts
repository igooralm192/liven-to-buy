import {
  authenticateUserRequest,
  authenticateUserSuccess,
  authenticateUserFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
} from './actions'
import { AuthenticateUserThunkAction } from './types'

import { login, register } from '../../api/auth'

export const authenticateUser = (
  email: string,
  password: string,
): AuthenticateUserThunkAction => {
  return async (dispatch, getState) => {
    const state = getState()

    if (state.isFetching) return

    dispatch(authenticateUserRequest())

    try {
      const user = await login(email, password)

      dispatch(authenticateUserSuccess(user))
    } catch (err) {
      dispatch(authenticateUserFailure(err.message))
    }
  }
}

export const createUser = (
  name: string,
  email: string,
  cpf: string,
  birthdate: Date,
  password: string,
): AuthenticateUserThunkAction => {
  return async (dispatch, getState) => {
    const state = getState()

    if (state.isFetching) return

    dispatch(createUserRequest())

    try {
      const user = await register(name, email, cpf, birthdate, password)

      dispatch(createUserSuccess(user))
    } catch (err) {
      dispatch(createUserFailure(err.message))
    }
  }
}
