import { defineStore } from 'pinia'

export const useFilters = defineStore('filters', () => {
  const { api } = useFeathers()
  const route = useRoute()
  const authStore = useAuthStore()

  const filters = ref<any>(null)
  const searchQuery = ref<string>('')
  const selectedRatings = ref<number[]>([])
  const selectedRestrictions = ref<string[]>([])
  const selectedGenres = ref<string[]>([])
  const selectedDevelopers = ref<string[]>([])
  const selectedFranchises = ref<string[]>([])

  const fetchFilters = async () => {
    try {
      filters.value = await api.service('items').filters(
        {
          userId: route.query.userId || authStore.user?._id,
          type: route.query.type as Item['type'] | undefined,
        },
        {}
      )
    } catch (e: any) {
      console.error(e.message)
    }
  }
  fetchFilters()

  api.service('items').on('created', fetchFilters)
  api.service('items').on('patched', fetchFilters)
  api.service('items').on('removed', fetchFilters)
  watch(() => route.query.type, fetchFilters)
  watch(() => authStore.user, fetchFilters)

  return {
    filters,
    searchQuery,
    selectedRatings,
    selectedRestrictions,
    selectedGenres,
    selectedDevelopers,
    selectedFranchises,
  }
})
