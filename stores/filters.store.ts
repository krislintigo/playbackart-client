import { defineStore, skipHydrate } from 'pinia'

export const useFilters = defineStore('filters', () => {
  const { api } = useFeathers()
  const route = useRoute()
  const authStore = useAuthStore()

  const filters = ref<FiltersOutput>(null)
  const searchQuery = ref(route.query.searchQuery || '')
  const selectedRatings = ref(
    [route.query.selectedRatings ?? []]
      .flat(1)
      .map((i) => Number(i)) as number[]
  )
  const selectedRestrictions = ref(
    [route.query.selectedRestrictions ?? []].flat(1) as string[]
  )
  const selectedGenres = ref(
    [route.query.selectedGenres ?? []].flat(1) as string[]
  )
  const genresIntersection = ref(route.query.genresIntersection || '$in')
  const selectedDevelopers = ref(
    [route.query.selectedDevelopers ?? []].flat(1) as string[]
  )
  const developersIntersection = ref(
    route.query.developersIntersection || '$in'
  )
  const selectedFranchises = ref(
    [route.query.selectedFranchises ?? []].flat(1) as string[]
  )

  watchEffect(() => {
    if (process.server) return
    // @TODO: performance?
    navigateTo(
      {
        query: {
          // set intersection here
          ...route.query,
          searchQuery: searchQuery.value || undefined,
          selectedRatings: selectedRatings.value,
          selectedRestrictions: selectedRestrictions.value,
          selectedGenres: selectedGenres.value,
          selectedDevelopers: selectedDevelopers.value,
          selectedFranchises: selectedFranchises.value,
        },
      },
      { replace: true }
    )
  })

  const fetchFilters = async () => {
    try {
      filters.value = await api.service('items').filters({
        userId: route.query.userId || authStore.user?._id,
        type: route.query.type as Item['type'] | undefined,
      })
    } catch (e: any) {
      console.error(e.message)
    }
  }

  api.service('items').on('created', fetchFilters)
  api.service('items').on('patched', fetchFilters)
  api.service('items').on('removed', fetchFilters)
  watch(() => route.query.type, fetchFilters, { immediate: true })
  watch(() => authStore.user, fetchFilters)

  return {
    filters,
    searchQuery: skipHydrate(searchQuery),
    selectedRatings: skipHydrate(selectedRatings),
    selectedRestrictions: skipHydrate(selectedRestrictions),
    selectedGenres: skipHydrate(selectedGenres),
    genresIntersection: skipHydrate(genresIntersection),
    selectedDevelopers: skipHydrate(selectedDevelopers),
    developersIntersection: skipHydrate(developersIntersection),
    selectedFranchises: skipHydrate(selectedFranchises),
  }
})
