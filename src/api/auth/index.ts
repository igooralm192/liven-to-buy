import { User } from '../../store/auth/types'

export const AuthenticateUserByEmailErrorsCode = {
  INCORRECT_EMAIL: '404',
  INCORRECT_PASSWORD: '401',
} as const

export type AuthenticateUserByEmailErrorsCode = typeof AuthenticateUserByEmailErrorsCode[keyof typeof AuthenticateUserByEmailErrorsCode]

const users: User[] = [
  {
    name: 'Igor',
    email: 'igoor1205@gmail.com',
    password: '123456',
    birthdate: new Date(),
    cpf: '123.456.789-01',
  },
]

export const authenticateUserByEmail = async (
  email: string,
  password: string,
): Promise<User> => {
  const filteredUser = users.find(user => user.email === email)

  if (!filteredUser) {
    throw new Error(AuthenticateUserByEmailErrorsCode.INCORRECT_EMAIL)
  }

  const samePassword = filteredUser.password === password

  if (!samePassword) {
    throw new Error(AuthenticateUserByEmailErrorsCode.INCORRECT_PASSWORD)
  }

  return filteredUser
}
