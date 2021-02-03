import { login, register } from '../api/auth'
import { User } from '../store/auth/types'

export default {
  login(email: string, password: string): Promise<User> {
    return login(email, password)
  },

  register(
    name: string,
    email: string,
    cpf: string,
    birthdate: Date,
    password: string,
  ): Promise<User> {
    return register(name, email, cpf, birthdate, password)
  },
}
