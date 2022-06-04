import { itemsClient } from '@/api/clients'
import { Item } from '@/interfaces/item'
import { UpdateItem } from '@/interfaces/update-item'

const endpoints = {
  addItem: '',
  getItems: '',
  getItemByType: (type: string) => `/types/${type}`,
  getItem: (id: string) => `/${id}`,
  updateItem: (id: string) => `/${id}`,
  deleteItem: (id: string) => `/${id}`
}

export class ItemsAPI {
  static async add (item: Item) {
    const response = await itemsClient.post(endpoints.addItem, item)
    return response.data
  }

  static async getAll () {
    const response = await itemsClient.get(endpoints.getItems)
    return response.data
  }

  static async getByType (type: string) {
    const response = await itemsClient.get(endpoints.getItemByType(type))
    return response.data
  }

  static async getOne (id: string) {
    const response = await itemsClient.get(endpoints.getItem(id))
    return response.data
  }

  static async update (id: string, item: UpdateItem) {
    const response = await itemsClient.put(endpoints.updateItem(id), item)
    return response.data
  }

  static async delete (id: string) {
    const response = await itemsClient.delete(endpoints.deleteItem(id))
    return response.data
  }
}
