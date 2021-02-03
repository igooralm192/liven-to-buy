import { User } from '../../store/auth/types'

export const LoginErrorsCode = {
  INCORRECT_EMAIL: '404',
  INCORRECT_PASSWORD: '401',
} as const

export type LoginErrorsCode = typeof LoginErrorsCode[keyof typeof LoginErrorsCode]

export const RegisterErrorsCode = {
  USER_EXISTS: '404',
} as const

export type RegisterErrorsCode = typeof RegisterErrorsCode[keyof typeof RegisterErrorsCode]

const users: User[] = []

export const login = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const filteredUser = users.find(user => user.email === email)

  if (!filteredUser) {
    throw new Error(LoginErrorsCode.INCORRECT_EMAIL)
  }

  const samePassword = filteredUser.password === password

  if (!samePassword) {
    throw new Error(LoginErrorsCode.INCORRECT_PASSWORD)
  }

  return filteredUser
}

export const register = async (
  name: string,
  email: string,
  cpf: string,
  birthdate: Date,
  password: string,
): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const filteredUser = users.find(
    user => user.email === email || user.cpf === cpf,
  )

  if (filteredUser) {
    throw new Error(RegisterErrorsCode.USER_EXISTS)
  }

  const user: User = {
    name,
    email,
    cpf,
    birthdate,
    password,
  }

  users.push(user)

  return user
}
