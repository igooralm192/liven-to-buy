import { authApi } from '../../services/api'

import { User } from '../../store/auth/types'

export const login = async (email: string, password: string): Promise<User> => {
  return authApi.login(email, password).then(apiUser => ({
    ...apiUser,
    birthdate: new Date(apiUser.birthdate),
  }))
}

export const register = async (
  name: string,
  email: string,
  cpf: string,
  birthdate: Date,
  password: string,
): Promise<User> => {
  return authApi
    .register(name, email, cpf, birthdate.toISOString(), password)
    .then(apiUser => ({
      ...apiUser,
      birthdate: new Date(apiUser.birthdate),
    }))
}
