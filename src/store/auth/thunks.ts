import {
  authenticateUserRequest,
  authenticateUserSuccess,
  authenticateUserFailure,
} from './actions'
import { AuthenticateUserThunkAction } from './types'

import { authenticateUserByEmail } from '../../api/auth'

export const authenticateUser = (
  email: string,
  password: string,
): AuthenticateUserThunkAction => {
  return async (dispatch, getState) => {
    const state = getState()

    if (state.isFetching) return

    dispatch(authenticateUserRequest())

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user = await authenticateUserByEmail(email, password)

      dispatch(authenticateUserSuccess(user))
    } catch (err) {
      dispatch(authenticateUserFailure(err.message))
    }
  }
}
