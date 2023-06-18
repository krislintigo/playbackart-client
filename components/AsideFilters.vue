<template lang="pug">
el-aside.aside(width='350px')
  el-row
    el-col
      h3.filter-header Оценки
      HorizontalBarChart(
        :labels='ratings.map((r) => r.value)',
        :data='ratings.map((r) => r.count)',
        :selected='selectedRatings',
        @click='ratingClick'
      )
  el-row
    el-col
      h3.filter-header Возрастные ограничения
      HorizontalBarChart(
        :labels='restrictions.map((r) => r.value)',
        :data='restrictions.map((r) => r.count)',
        :selected='selectedRestrictions',
        @click='restrictionClick'
      )
  el-row
    el-col
      h3.filter-header Жанры
      el-row
        el-link.item(
          v-for='genre in genres',
          :key='genre',
          :class='{ [getGenreTextClass(genre)]: true, "item-selected": selectedGenres.includes(genre.value) }',
          @click='genreClick(genre.value)'
        ) {{ genre.value }}
  el-row
    el-col
      h3.filter-header Создатели
      el-row
        el-link.item(
          v-for='developer in developers.primary',
          :key='developer',
          :class='{ [getDeveloperTextClass(developer)]: true, "item-selected": selectedDevelopers.includes(developer.value) }',
          @click='developerClick(developer.value)'
        ) {{ developer.value }}
        el-select(
          v-if='developers.secondary.length',
          v-model='selectedDevelopers',
          filterable,
          multiple,
          collapse-tags,
          collapse-tags-tooltip,
          placeholder='Другие создатели...',
          style='width: 100%; margin-top: 10px'
        )
          el-option(
            v-for='item in developers.secondary',
            :key='item',
            :label='item.value',
            :value='item.value'
          )
  el-row
    el-col
      h3.filter-header Франшизы
      el-row
        el-link.item(
          v-for='franchise in franchises.primary',
          :key='franchise',
          :class='{ [getFranchiseTextClass(franchise)]: true, "item-selected": selectedFranchises.includes(franchise.value) }',
          @click='franchiseClick(franchise.value)'
        ) {{ franchise.value }}
        el-select(
          v-if='franchises.secondary.length',
          v-model='selectedFranchises',
          filterable,
          multiple,
          collapse-tags,
          collapse-tags-tooltip,
          placeholder='Другие франшизы...',
          style='width: 100%; margin-top: 10px'
        )
          el-option(
            v-for='item in franchises.secondary',
            :key='item',
            :label='item.value',
            :value='item.value'
          )
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const queryFilters = useFilters()
const {
  filters,
  selectedRatings,
  selectedRestrictions,
  selectedGenres,
  selectedDevelopers,
  selectedFranchises,
} = storeToRefs(queryFilters)

const ratings = computed(() =>
  [...filters.value.ratings.filter((i) => i.value)].sort(
    (a, b) => b.value - a.value
  )
)
const restrictions = computed(() =>
  [...filters.value.restrictions.filter((r) => r.value)].sort(
    (a, b) =>
      restrictionsTemplate.indexOf(a.value) -
      restrictionsTemplate.indexOf(b.value)
  )
)
const genres = computed(() => filters.value.genres.filter((i) => i.value))
const developers = computed(() => {
  const primary = []
  const secondary = []
  filters.value.developers
    .filter((i) => i.value)
    .forEach((developer) => {
      const percentage = getFilterPercentage(developer)
      if (percentage > 7) {
        primary.push(developer)
      } else {
        secondary.push(developer)
      }
    })
  return { primary, secondary }
})
const franchises = computed(() => {
  const primary = []
  const secondary = []
  filters.value.franchises
    .filter((i) => i.value)
    .forEach((franchise) => {
      const percentage = getFilterPercentage(franchise)
      if (percentage > 7) {
        primary.push(franchise)
      } else {
        secondary.push(franchise)
      }
    })
  return { primary, secondary }
})

const getFilterPercentage = (item) =>
  ((item.fullDurations.reduce((acc, cur) => acc + cur, 0) *
    item.ratings.reduce((acc, cur) => acc + ratingCoefficient(cur), 1)) /
    filters.value.total.reduce((acc, cur) => acc + cur.duration, 0)) *
  100

const ratingClick = (gradeIndex: number) => {
  const rating = ratings.value[gradeIndex]
  if (selectedRatings.value.includes(rating.value)) {
    selectedRatings.value = selectedRatings.value.filter(
      (r) => r !== rating.value
    )
  } else {
    selectedRatings.value.push(rating.value)
  }
}

const restrictionClick = (restrictionIndex: number) => {
  const restriction = restrictions.value[restrictionIndex]
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

const getGenreTextClass = (genre: {
  value: string
  ratings: number[]
  durations: number[]
  fullDurations: number[]
  count: number
}) => {
  const percentage =
    (genre.fullDurations.reduce((acc, cur) => acc + cur, 0) *
      genre.ratings.reduce((acc, cur) => acc + ratingCoefficient(cur), 1)) /
    filters.value.total.reduce((acc, cur) => acc + cur.fullDuration, 0)
  return getTextSizeClass(percentage, 'genre')
}

const getDeveloperTextClass = (developer: {
  value: string
  ratings: number[]
  durations: number[]
  fullDurations: number[]
  count: number
}) => {
  const percentage =
    ((developer.fullDurations.reduce((acc, cur) => acc + cur, 0) *
      developer.ratings.reduce((acc, cur) => acc + ratingCoefficient(cur), 1)) /
      developers.value.primary.reduce(
        (acc, cur) => acc + cur.durations.reduce((acc, cur) => acc + cur, 0),
        0
      )) *
    100
  return getTextSizeClass(percentage, 'developer')
}

const getFranchiseTextClass = (franchise: {
  value: string
  ratings: number[]
  durations: number[]
  fullDurations: number[]
  count: number
}) => {
  const percentage =
    ((franchise.fullDurations.reduce((acc, cur) => acc + cur, 0) *
      franchise.ratings.reduce((acc, cur) => acc + ratingCoefficient(cur), 1)) /
      developers.value.primary.reduce(
        (acc, cur) => acc + cur.durations.reduce((acc, cur) => acc + cur, 0),
        0
      )) *
    100
  return getTextSizeClass(percentage, 'developer')
}
</script>

<style scoped lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

.filter-header {
  background-color: var(--el-color-info-light-8);
  padding: 10px;
  margin-top: 0;
  margin-bottom: 10px;
  border-left: 5px solid var(--el-text-color-primary);
  font-size: 16px;
  text-transform: uppercase;
}

.item {
  margin: 4px 8px;
}

.item-selected {
  color: var(--el-color-primary);
}
</style>
