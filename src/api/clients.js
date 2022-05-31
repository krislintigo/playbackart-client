import axios from 'axios'

export const authClient = axios.create({
  baseURL: `${process.env.VUE_APP_SERVER_BASE_URL}/auth`,
  withCredentials: true
})

export const itemsClient = axios.create({
  baseURL: `${process.env.VUE_APP_SERVER_BASE_URL}/items`,
  withCredentials: true
})
