import { ref, computed, Ref } from 'vue'
import { Item } from '@/interfaces/item'

export const useFilters = (allItems: any) => {
  const searchQuery = ref('')
  const selectedGrades: Ref<number[]> = ref([])
  const selectedRestrictions: Ref<string[]> = ref([])
  const selectedGenres: Ref<string[]> = ref([])
  const selectedDevelopers: Ref<string[]> = ref([])
  const selectedFranchises: Ref<string[]> = ref([])

  const queriedItems = computed<Item[]>(() => {
    const searchFilter = allItems.value.filter((i: Item) => i.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const gradeFilter = selectedGrades.value.length
      ? searchFilter.filter((i: Item) => selectedGrades.value.includes(i.rating))
      : searchFilter
    const restrictionFilter = selectedRestrictions.value.length
      ? gradeFilter.filter((i: Item) => selectedRestrictions.value.includes(i.restriction))
      : gradeFilter
    const genresFilter = selectedGenres.value.length
      ? restrictionFilter.filter((i: Item) => selectedGenres.value.some(g => i.genres?.includes(g)))
      : restrictionFilter
    const developersFilter = selectedDevelopers.value.length
      ? genresFilter.filter((i: Item) => selectedDevelopers.value.some(d => i.developers?.includes(d)))
      : genresFilter
    return selectedFranchises.value.length
      ? developersFilter.filter((i: Item) => selectedFranchises.value.some(f => i.franchise === f))
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
