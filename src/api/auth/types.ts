export const LoginErrorsCode = {
  INCORRECT_EMAIL: '404',
  INCORRECT_PASSWORD: '401',
} as const

export type LoginErrorsCode = typeof LoginErrorsCode[keyof typeof LoginErrorsCode]

export const RegisterErrorsCode = {
  USER_EXISTS: '404',
} as const

export type RegisterErrorsCode = typeof RegisterErrorsCode[keyof typeof RegisterErrorsCode]
