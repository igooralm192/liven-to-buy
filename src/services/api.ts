import axios from 'axios'

import { LoginErrorsCode, RegisterErrorsCode } from '../api/auth/types'
import AppError from '../errors/AppError'

interface ApiUser {
  name: string
  email: string
  cpf: string
  birthdate: string
  password: string
}

const USERS_KEY = '@liven-to-buy/users'
const serializedUsers = localStorage.getItem(USERS_KEY)

const users: ApiUser[] = serializedUsers ? JSON.parse(serializedUsers) : []

export const authApi = {
  login: async (email: string, password: string): Promise<ApiUser> => {
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
  },
  register: async (
    name: string,
    email: string,
    cpf: string,
    birthdate: string,
    password: string,
  ): Promise<ApiUser> => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const filteredUser = users.find(
      user => user.email === email || user.cpf === cpf,
    )

    if (filteredUser) {
      throw new Error(RegisterErrorsCode.USER_EXISTS)
    }

    const user: ApiUser = {
      name,
      email,
      cpf,
      birthdate,
      password,
    }

    users.push(user)

    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    return user
  },
}

export const productsApi = axios.create({
  baseURL: 'https://5d6da1df777f670014036125.mockapi.io/api/v1/',
})

productsApi.interceptors.response.use(
  response => response.data,
  error => {
    if (error && error.response && error.response.data.code) {
      throw new AppError(error.response.data.code, 400)
    }

    throw new AppError('INTERNAL_SERVER_ERROR', 500)
  },
)
