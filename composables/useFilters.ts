export const useFilters = () => {
  const searchQuery = ref<string>('')
  const selectedRatings = ref<number[]>([])
  const selectedRestrictions = ref<string[]>([])
  const selectedGenres = ref<string[]>([])
  const selectedDevelopers = ref<string[]>([])
  const selectedFranchises = ref<string[]>([])

  // const queriedItems = computed<Item[]>(() => {
  //   const searchFilter: Item[] = allItems.value.filter((i: Item) =>
  //     i.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  //   )
  //
  //   const gradeFilter: Item[] = selectedGrades.value.length
  //     ? searchFilter.filter((i: Item) =>
  //         selectedGrades.value.includes(i.rating)
  //       )
  //     : searchFilter
  //
  //   const restrictionFilter: Item[] = selectedRestrictions.value.length
  //     ? gradeFilter.filter((i: Item) =>
  //         selectedRestrictions.value.includes(i.restriction)
  //       )
  //     : gradeFilter
  //
  //   const genresFilter: Item[] = selectedGenres.value.length
  //     ? restrictionFilter.filter((i: Item) =>
  //         selectedGenres.value.some((g) => i.genres?.includes(g))
  //       )
  //     : restrictionFilter
  //
  //   const developersFilter: Item[] = selectedDevelopers.value.length
  //     ? genresFilter.filter((i: Item) =>
  //         selectedDevelopers.value.some((d) => i.developers?.includes(d))
  //       )
  //     : genresFilter
  //
  //   return selectedFranchises.value.length
  //     ? developersFilter.filter((i: Item) =>
  //         selectedFranchises.value.includes(i.franchise)
  //       )
  //     : developersFilter
  // })

  return {
    searchQuery,
    selectedRatings,
    selectedRestrictions,
    selectedGenres,
    selectedDevelopers,
    selectedFranchises,
    // queriedItems,
  }
}
