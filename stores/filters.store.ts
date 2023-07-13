import { defineStore } from 'pinia'

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

  console.log(
    'AFTER INIT',
    route.query,
    searchQuery.value,
    selectedRatings.value,
    selectedRestrictions.value,
    selectedGenres.value,
    selectedDevelopers.value,
    selectedFranchises.value
  )

  watch(
    [
      () => searchQuery.value,
      () => selectedRatings.value,
      () => selectedRestrictions.value,
      () => selectedGenres.value,
      () => selectedDevelopers.value,
      () => selectedFranchises.value,
    ],
    ([
      searchQuery,
      selectedRatings,
      selectedRestrictions,
      selectedGenres,
      selectedDevelopers,
      selectedFranchises,
    ]) => {
      console.log(
        'QUERY',
        route.query,
        searchQuery,
        selectedRatings,
        selectedRestrictions,
        selectedGenres,
        selectedDevelopers,
        selectedFranchises
      )
      navigateTo(
        {
          query: {
            ...route.query,
            searchQuery,
            selectedRatings,
            selectedRestrictions,
            selectedGenres,
            selectedDevelopers,
            selectedFranchises,
          },
        },
        { replace: true }
      )
    },
    { deep: true }
  )

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
    searchQuery,
    selectedRatings,
    selectedRestrictions,
    selectedGenres,
    selectedDevelopers,
    selectedFranchises,
  }
})
