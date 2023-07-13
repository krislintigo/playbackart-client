export default defineNuxtPlugin((_nuxtApp) => {
  const filters = useFilters()
  const route = useRoute()

  watch(
    [
      () => filters.searchQuery,
      () => filters.selectedRatings,
      () => filters.selectedRestrictions,
      () => filters.selectedGenres,
      () => filters.selectedDevelopers,
      () => filters.selectedFranchises,
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
})
