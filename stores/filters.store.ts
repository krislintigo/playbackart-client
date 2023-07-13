import { defineStore, skipHydrate } from 'pinia'

export const useFilters = defineStore('filters', () => {
  const { api } = useFeathers()
  const route = useRoute()
  const authStore = useAuthStore()

  const filterFn = api.service('items').filters
  type FilterReturnType = Awaited<ReturnType<typeof filterFn>>

  const filters = ref<FilterReturnType | null>(null)
  const searchQuery = ref<string>((route.query.searchQuery as string) || '')
  const selectedRatings = ref<number[]>(
    [route.query.selectedRatings ?? []]
      .flat(1)
      .map((i) => Number(i)) as number[]
  )
  const selectedRestrictions = ref<string[]>(
    [route.query.selectedRestrictions ?? []].flat(1) as string[]
  )
  const selectedGenres = ref<string[]>(
    [route.query.selectedGenres ?? []].flat(1) as string[]
  )
  const selectedDevelopers = ref<string[]>(
    [route.query.selectedDevelopers ?? []].flat(1) as string[]
  )
  const selectedFranchises = ref<string[]>(
    [route.query.selectedFranchises ?? []].flat(1) as string[]
  )

  watchEffect(() => {
    if (process.server) return
    // @TODO: performance
    navigateTo(
      {
        query: {
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
    selectedDevelopers: skipHydrate(selectedDevelopers),
    selectedFranchises: skipHydrate(selectedFranchises),
  }
})
