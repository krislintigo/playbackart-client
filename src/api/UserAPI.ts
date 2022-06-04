import { userClient } from '@/api/clients'

const endpoints = {
  getAll: '',
  getOne: (id: string) => `/${id}`,
  getOneShort: (id: string) => `/${id}/short`
}

export class UserAPI {
  static async getAll () {
    const response = await userClient.get(endpoints.getAll)
    return response.data
  }

  static async getOne (id: string) {
    const response = await userClient.get(endpoints.getOne(id))
    return response.data
  }

  static async getOneShort (id: string) {
    const response = await userClient.get(endpoints.getOneShort(id))
    return response.data
  }
}
