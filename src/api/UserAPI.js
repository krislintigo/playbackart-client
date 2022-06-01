import { userClient } from '@/api/clients'

const endpoints = {
  getAll: '',
  getOne: id => `/${id}`,
  getOneShort: id => `/${id}/short`
}

export class UserAPI {
  static async getAll () {
    const response = await userClient.get(endpoints.getAll)
    return response.data
  }

  static async getOne (id) {
    const response = await userClient.get(endpoints.getOne(id))
    return response.data
  }

  static async getOneShort (id) {
    const response = await userClient.get(endpoints.getOneShort(id))
    return response.data
  }
}
