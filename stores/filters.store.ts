import { defineStore, skipHydrate } from 'pinia'

export const useFilters = defineStore('filters', () => {
  const { api } = useFeathers()
  const route = useRoute()
  const authStore = useAuthStore()

  const isPending = ref(true)
  const filters = ref<FiltersOutput>({
    ratings: [],
    restrictions: [],
    genres: [],
    developers: [],
    franchises: [],
    categories: [],
    total: [],
  })
  const search = ref(route.query.search || '')
  const selectedRatings = ref(
    [route.query.selectedRatings ?? []]
      .flat(1)
      .map((i) => Number(i)) as number[],
  )
  const selectedRestrictions = ref(
    [route.query.selectedRestrictions ?? []].flat(1) as string[],
  )
  const selectedGenres = ref(
    [route.query.selectedGenres ?? []].flat(1) as string[],
  )
  const selectedCategories = ref(
    [route.query.selectedCategories ?? []].flat(1) as string[],
  )
  const selectedDevelopers = ref(
    [route.query.selectedDevelopers ?? []].flat(1) as string[],
  )
  const selectedFranchises = ref(
    [route.query.selectedFranchises ?? []].flat(1) as string[],
  )
  const selectors = ref<{
    genres: '$in' | '$all'
    developers: '$in' | '$all'
  }>({
    genres:
      JSON.parse((route.query.selectors as string) || '{}').genres || '$in',
    developers:
      JSON.parse((route.query.selectors as string) || '{}').developers || '$in',
  })

  const userId = computed<string | undefined>(
    () => route.query.userId || authStore.user?._id,
  )

  watchEffect(() => {
    if (process.server) return
    const stringSelectors = JSON.stringify({
      ...(selectors.value.genres !== '$in' && {
        genres: selectors.value.genres,
      }),
      ...(selectors.value.developers !== '$in' && {
        developers: selectors.value.developers,
      }),
    })
    return navigateTo(
      {
        query: {
          ...route.query,
          search: search.value || undefined,
          selectedRatings: selectedRatings.value,
          selectedRestrictions: selectedRestrictions.value,
          selectedGenres: selectedGenres.value,
          selectedCategories: selectedCategories.value,
          selectedDevelopers: selectedDevelopers.value,
          selectedFranchises: selectedFranchises.value,
          selectors: stringSelectors !== '{}' ? stringSelectors : undefined,
        },
      },
      { replace: true },
    )
  })

  const fetchFilters = async () => {
    try {
      isPending.value = true
      filters.value = await api.service('items').filters({
        userId: userId.value,
        type: route.query.type as Item['type'] | undefined,
      })
    } catch (e: any) {
      console.error(e.message)
    } finally {
      isPending.value = false
    }
  }

  api.service('items').on('cud', ({ userId: _userId }: Item) => {
    if (_userId !== userId.value) return
    fetchFilters()
  })
  watch(() => route.query.type, fetchFilters, { immediate: true })
  watch(userId, fetchFilters)

  return {
    filters,
    isPending,
    userId,
    search: skipHydrate(search),
    selectedRatings: skipHydrate(selectedRatings),
    selectedRestrictions: skipHydrate(selectedRestrictions),
    selectedGenres: skipHydrate(selectedGenres),
    selectedCategories: skipHydrate(selectedCategories),
    selectedDevelopers: skipHydrate(selectedDevelopers),
    selectedFranchises: skipHydrate(selectedFranchises),
    selectors: skipHydrate(selectors),
  }
})
