import { itemsClient } from '@/api/clients'

const endpoints = {
  addItem: '',
  getItems: '',
  getItemByType: type => `/types/${type}`,
  getItem: id => `/${id}`,
  updateItem: id => `/${id}`,
  deleteItem: id => `/${id}`
}

export class ItemsAPI {
  static async add (item) {
    const response = await itemsClient.post(endpoints.addItem, item)
    return response.data
  }

  static async getAll () {
    const response = await itemsClient.get(endpoints.getItems)
    return response.data
  }

  static async getByType (type) {
    const response = await itemsClient.get(endpoints.getItemByType(type))
    return response.data
  }

  static async getOne (id) {
    const response = await itemsClient.get(endpoints.getItem(id))
    return response.data
  }

  static async update (id, item) {
    const response = await itemsClient.put(endpoints.updateItem(id), item)
    return response.data
  }

  static async delete (id) {
    const response = await itemsClient.delete(endpoints.deleteItem(id))
    return response.data
  }
}
