<template lang="pug">
el-aside.flex.flex-col.gap-7(:width='width > 400 ? "350px" : "300px"')
  el-row
    el-col
      FilterHeader(title='Рейтинги', :is-pending='isPending')
      HorizontalBarChart(
        :labels='ratings.map((r) => r.value)',
        :data='ratings.map((r) => r.count)',
        :selected='selectedRatings',
        @click='ratingClick'
      )
  el-row
    el-col
      FilterHeader(title='Возрастные ограничения', :is-pending='isPending')
      HorizontalBarChart(
        :labels='restrictions.map((r) => r.value)',
        :data='restrictions.map((r) => r.count)',
        :selected='selectedRestrictions',
        @click='restrictionClick'
      )
  el-row
    el-col
      FilterHeader(
        v-model:selector='selectors.genres',
        title='Жанры',
        :is-pending='isPending'
      )
      el-row
        el-link.mx-2(
          v-for='genre in genres',
          :key='genre',
          :class='{ [textClass("genre", genre)]: true, "item-selected": selectedGenres.includes(genre.value) }',
          class='my-0.5',
          @click='genreClick(genre.value)'
        ) {{ genre.value }}
  el-row
    el-col
      FilterHeader(
        v-model:selector='selectors.developers',
        title='Создатели',
        :is-pending='isPending'
      )
      el-row
        el-link.mx-2(
          v-for='developer in developers.primary',
          :key='developer',
          :class='{ [textClass("developer", developer)]: true, "item-selected": selectedDevelopers.includes(developer.value) }',
          class='my-0.5',
          @click='developerClick(developer.value)'
        ) {{ developer.value }}
        el-select.w-full.mt-3(
          v-if='developers.secondary.length',
          v-model='selectedDevelopers',
          filterable,
          multiple,
          collapse-tags,
          collapse-tags-tooltip,
          placeholder='Другие создатели...'
        )
          el-option(
            v-for='item in developers.secondary',
            :key='item',
            :label='item.value',
            :value='item.value'
          )
  el-row
    el-col
      FilterHeader(title='Франшзы', :is-pending='isPending')
      el-row
        el-link.mx-2(
          v-for='franchise in franchises.primary',
          :key='franchise',
          :class='{ [textClass("franchise", franchise)]: true, "item-selected": selectedFranchises.includes(franchise.value) }',
          class='my-0.5',
          @click='franchiseClick(franchise.value)'
        ) {{ franchise.value }}
        el-select.w-full.mt-3(
          v-if='franchises.secondary.length',
          v-model='selectedFranchises',
          filterable,
          multiple,
          collapse-tags,
          collapse-tags-tooltip,
          placeholder='Другие франшизы...'
        )
          el-option(
            v-for='item in franchises.secondary',
            :key='item',
            :label='item.value',
            :value='item.value'
          )
  el-button(text, bg, type='danger', @click='resetFilters') Сбросить фильтры
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { width } = useWindowSize()
const queryFilters = useFilters()
const {
  filters,
  isPending,
  search,
  selectedRatings,
  selectedRestrictions,
  selectedGenres,
  selectedDevelopers,
  selectedFranchises,
  selectors,
} = storeToRefs(queryFilters)

const ratings = computed(() =>
  [...filters.value.ratings].sort((a, b) => b.value - a.value)
)
const restrictions = computed(() =>
  [...filters.value.restrictions].sort(
    (a, b) =>
      restrictionsTemplate.indexOf(a.value) -
      restrictionsTemplate.indexOf(b.value)
  )
)
const genres = computed(() => filters.value.genres)
const developers = computed(() => {
  const primary: ExtendedStatistic<string>[] = []
  const secondary: ExtendedStatistic<string>[] = []
  filters.value.developers.forEach((developer) => {
    const percentage = developer.coefficient * 100
    if (percentage > 2) {
      primary.push(developer)
    } else {
      secondary.push(developer)
    }
  })
  return { primary, secondary }
})
const franchises = computed(() => {
  const primary: ExtendedStatistic<string>[] = []
  const secondary: ExtendedStatistic<string>[] = []
  filters.value.franchises.forEach((franchise) => {
    const percentage = franchise.coefficient * 100
    if (percentage > 2) {
      primary.push(franchise)
    } else {
      secondary.push(franchise)
    }
  })
  return { primary, secondary }
})

const ratingClick = (index: number) => {
  const rating = ratings.value[index]
  if (selectedRatings.value.includes(rating.value)) {
    selectedRatings.value = selectedRatings.value.filter(
      (r) => r !== rating.value
    )
  } else {
    selectedRatings.value.push(rating.value)
  }
}

const restrictionClick = (index: number) => {
  const restriction = restrictions.value[index]
  if (selectedRestrictions.value.includes(restriction.value)) {
    selectedRestrictions.value = selectedRestrictions.value.filter(
      (r) => r !== restriction.value
    )
  } else {
    selectedRestrictions.value.push(restriction.value)
  }
}

const genreClick = (genre: string) => {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter((g) => g !== genre)
  } else {
    selectedGenres.value.push(genre)
  }
}

const developerClick = (developer: string) => {
  if (selectedDevelopers.value.includes(developer)) {
    selectedDevelopers.value = selectedDevelopers.value.filter(
      (d) => d !== developer
    )
  } else {
    selectedDevelopers.value.push(developer)
  }
}

const franchiseClick = (franchise: string) => {
  if (selectedFranchises.value.includes(franchise)) {
    selectedFranchises.value = selectedFranchises.value.filter(
      (d) => d !== franchise
    )
  } else {
    selectedFranchises.value.push(franchise)
  }
}

const textClass = (
  target: 'genre' | 'developer' | 'franchise',
  value: ExtendedStatistic<string>
) => {
  const getPercentage = () => {
    switch (target) {
      case 'genre':
        return value.coefficient * 100
      case 'developer':
        return value.coefficient * 500
      case 'franchise':
        return value.coefficient * 500
    }
  }
  return getTextSizeClass(getPercentage(), target)
}

const resetFilters = () => {
  search.value = ''
  selectedRatings.value = []
  selectedRestrictions.value = []
  selectedGenres.value = []
  selectedDevelopers.value = []
  selectedFranchises.value = []
}
</script>

<style scoped lang="scss">
.item-selected {
  color: var(--el-color-primary);
}
</style>
