import { itemsClient } from '@/api/clients'
import { CreateItem } from '@/interfaces/create-item'
import { Item } from '@/interfaces/item'

const endpoints = {
  addItem: '',
  getItems: '',
  getItemByType: (type: string) => `/types/${type}`,
  getItem: (id: string) => `/${id}`,
  updateItem: (id: string) => `/${id}`,
  deleteItem: (id: string) => `/${id}`
}

export class ItemsAPI {
  static async add (item: CreateItem) {
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

  static async update (id: string, item: Item) {
    const response = await itemsClient.put(endpoints.updateItem(id), item)
    return response.data
  }

  static async delete (id: string) {
    const response = await itemsClient.delete(endpoints.deleteItem(id))
    return response.data
  }
}
