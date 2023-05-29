import { defineStore } from 'pinia'

export const useFilters = defineStore('filters', () => {
  const { api } = useFeathers()
  const route = useRoute()

  const filters = ref<any>(null)
  const searchQuery = ref<string>('')
  const selectedRatings = ref<number[]>([])
  const selectedRestrictions = ref<string[]>([])
  const selectedGenres = ref<string[]>([])
  const selectedDevelopers = ref<string[]>([])
  const selectedFranchises = ref<string[]>([])

  const fetchFilters = async () => {
    try {
      filters.value = await api
        .service('items')
        .filters({ login: route.query.login, type: route.query.type }, {})
      console.log(filters.value)
    } catch (e) {
      console.error(e)
    }
  }
  fetchFilters()

  api.service('items').on('created', fetchFilters)
  api.service('items').on('patched', fetchFilters)
  api.service('items').on('removed', fetchFilters)

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
