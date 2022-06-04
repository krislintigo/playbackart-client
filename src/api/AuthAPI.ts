import { authClient } from '@/api/clients'

const endpoints = {
  login: '/login',
  register: '/register',
  validate: '/validate',
  logout: '/logout'
}

interface AuthData {
  login: string
  password: string
}

export class AuthAPI {
  static async register (authData: AuthData) {
    const response = await authClient.post(endpoints.register, authData)
    return response.data
  }

  static async login (authData: AuthData) {
    const response = await authClient.post(endpoints.login, authData)
    return response.data
  }

  static async validate () {
    const response = await authClient.get(endpoints.validate)
    return response.data
  }

  static async logout () {
    const response = await authClient.get(endpoints.logout)
    return response.data
  }
}
