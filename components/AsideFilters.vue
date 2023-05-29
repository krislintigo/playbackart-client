<template lang="pug">
el-aside.aside(width='350px')
  el-row
    el-col
      h3.back-header Оценки
      HorizontalBarChart(
        :labels='ratings.map((r) => r.value)',
        :data='ratings.map((r) => r.count)',
        :selected='selectedRatings',
        @click='ratingClick'
      )
  el-row
    el-col
      h3.back-header Возрастные ограничения
      HorizontalBarChart(
        :labels='restrictions.map((r) => r.value)',
        :data='restrictions.map((r) => r.count)',
        :selected='selectedRestrictions',
        @click='restrictionClick'
      )
  el-row
    el-col
      h3.back-header Жанры
      el-row
        el-link.item(
          v-for='genre in genres',
          :key='genre',
          :class='{ [getGenreTextClass(genre)]: true, "item-selected": selectedGenres.includes(genre.value) }',
          @click='genreClick(genre.value)'
        ) {{ genre.value }}
  el-row
    el-col
      h3.back-header Создатели
      el-row
        el-link.item(
          v-for='developer in dividedDevelopers.primary',
          :key='developer',
          :class='{ [getDeveloperTextClass(developer)]: true, "item-selected": selectedDevelopers.includes(developer.value) }',
          @click='developerClick(developer.value)'
        ) {{ developer.value }}
        el-select(
          v-model='selectedDevelopers',
          filterable,
          multiple,
          collapse-tags,
          collapse-tags-tooltip,
          placeholder='Другие создатели...',
          style='width: 100%; margin-top: 10px'
        )
          el-option(
            v-for='item in dividedDevelopers.secondary',
            :key='item',
            :label='item.value',
            :value='item.value'
          )
  el-row
    el-col
      h3.back-header Франшизы
      el-select(
        v-model='selectedFranchises',
        filterable,
        multiple,
        collapse-tags,
        collapse-tags-tooltip,
        placeholder='Введите название тут',
        style='width: 100%'
      )
        el-option(
          v-for='item in franchises',
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
const developers = computed(() =>
  filters.value.developers.filter((i) => i.value)
)
const franchises = computed(() =>
  filters.value.franchises.filter((i) => i.value)
)

const dividedDevelopers = computed(() => {
  const primary = []
  const secondary = []
  developers.value.forEach((developer) => {
    const percentage =
      ((developer.durations.reduce((acc, cur) => acc + cur, 0) *
        developer.ratings.reduce(
          (acc, cur) => acc * ratingCoefficient(cur),
          1
        )) /
        filters.value.total.duration) *
      100
    if (percentage > 5) {
      primary.push(developer)
    } else {
      secondary.push(developer)
    }
  })
  return { primary, secondary }
})

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

const getGenreTextClass = (genre: {
  value: string
  ratings: number[]
  durations: number[]
  count: number
}) => {
  // const percentage = props.items.filter(i => i.genres.includes(genre)).length / props.items.length * 100
  const percentage =
    (genre.durations.reduce((acc, cur) => acc + cur, 0) *
      genre.ratings.reduce((acc, cur) => acc * ratingCoefficient(cur), 1)) /
    filters.value.total.duration
  return getTextSizeClass(percentage, filters.value.total.count, 'genre')
}

const getDeveloperTextClass = (developer: {
  value: string
  ratings: number[]
  durations: number[]
  count: number
}) => {
  const percentage =
    (developer.count / dividedDevelopers.value.primary.length) * 100
  return getTextSizeClass(percentage, filters.value.total.count, 'developer')
}
</script>

<style scoped>
.aside {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

.back-header {
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
