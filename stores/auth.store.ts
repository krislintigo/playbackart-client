// stores/auth.ts
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()
  const auth = useAuth({ api, servicePath: 'users' })
  auth.reAuthenticate()
  return auth
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
