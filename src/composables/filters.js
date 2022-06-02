import { ref, computed } from 'vue'

export function useFilters (allItems) {
  const searchQuery = ref('')
  const selectedGrades = ref([])
  const selectedRestrictions = ref([])
  const selectedGenres = ref([])

  const queriedItems = computed(() => {
    const searchFilter = allItems.value.filter(i => i.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const gradeFilter = selectedGrades.value.length
      ? searchFilter.filter(i => selectedGrades.value.includes(i.rating))
      : searchFilter
    const restrictionFilter = selectedRestrictions.value.length
      ? gradeFilter.filter(i => selectedRestrictions.value.includes(i.restriction))
      : gradeFilter
    return selectedGenres.value.length
      ? restrictionFilter.filter(i => selectedGenres.value.some(g => i.genres?.includes(g)))
      : restrictionFilter
  })

  return { searchQuery, selectedGrades, selectedRestrictions, selectedGenres, queriedItems }
}
