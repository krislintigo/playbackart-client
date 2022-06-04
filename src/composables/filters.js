import { ref, computed } from 'vue'

export const useFilters = (allItems) => {
  const searchQuery = ref('')
  const selectedGrades = ref([])
  const selectedRestrictions = ref([])
  const selectedGenres = ref([])
  const selectedDevelopers = ref([])
  const selectedFranchises = ref([])

  const queriedItems = computed(() => {
    const searchFilter = allItems.value.filter(i => i.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const gradeFilter = selectedGrades.value.length
      ? searchFilter.filter(i => selectedGrades.value.includes(i.rating))
      : searchFilter
    const restrictionFilter = selectedRestrictions.value.length
      ? gradeFilter.filter(i => selectedRestrictions.value.includes(i.restriction))
      : gradeFilter
    const genresFilter = selectedGenres.value.length
      ? restrictionFilter.filter(i => selectedGenres.value.some(g => i.genres?.includes(g)))
      : restrictionFilter
    const developersFilter = selectedDevelopers.value.length
      ? genresFilter.filter(i => selectedDevelopers.value.some(d => i.developers?.includes(d)))
      : genresFilter
    return selectedFranchises.value.length
      ? developersFilter.filter(i => selectedFranchises.value.some(f => i.franchise === f))
      : developersFilter
  })

  return {
    searchQuery,
    selectedGrades,
    selectedRestrictions,
    selectedGenres,
    selectedDevelopers,
    selectedFranchises,
    queriedItems
  }
}
