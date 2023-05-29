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
          :class='{ [getGenreTextClass(genre.value)]: true, "item-selected": selectedGenres.includes(genre.value) }',
          @click='genreClick(genre.value)'
        ) {{ genre.value }}
  el-row
    el-col
      h3.back-header Создатели
      el-row
        el-link.item(
          v-for='developer in dividedDevelopers.primary',
          :key='developer',
          :class='{ [getDeveloperTextClass(developer.value)]: true, "item-selected": selectedDevelopers.includes(developer.value) }',
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
const props = defineProps<{
  selectedRatings: number[]
  selectedRestrictions: string[]
  selectedGenres: string[]
  selectedDevelopers: string[]
  selectedFranchises: string[]
  filters: {
    ratings: {
      value: number
      count: number
    }[]
    restrictions: {
      value: string
      count: number
    }[]
    genres: {
      value: string
      ratings: number[]
      durations: number[]
      count: number
    }[]
    developers: {
      value: string
      ratings: number[]
      durations: number[]
      count: number
    }[]
    franchises: {
      value: string
      ratings: number[]
      durations: number[]
      count: number
    }[]
    total: {
      count: number
      duration: number
    }
  }
}>()

const emit = defineEmits<{
  (e: 'update:selectedRatings', value: number[]): void
  (e: 'update:selectedRestrictions', value: string[]): void
  (e: 'update:selectedGenres', value: string[]): void
  (e: 'update:selectedDevelopers', value: string[]): void
  (e: 'update:selectedFranchises', value: string[]): void
}>()

const selectedRatings = computed({
  get: () => props.selectedRatings,
  set: (value) => emit('update:selectedRatings', value),
})
const selectedRestrictions = computed({
  get: () => props.selectedRestrictions,
  set: (value) => emit('update:selectedRestrictions', value),
})
const selectedGenres = computed({
  get: () => props.selectedGenres,
  set: (value) => emit('update:selectedGenres', value),
})
const selectedDevelopers = computed({
  get: () => props.selectedDevelopers,
  set: (value) => emit('update:selectedDevelopers', value),
})
const selectedFranchises = computed({
  get: () => props.selectedFranchises,
  set: (value) => emit('update:selectedFranchises', value),
})

const ratings = computed(() =>
  [...props.filters.ratings.filter((i) => i.value)].sort(
    (a, b) => b.value - a.value
  )
)
const restrictions = computed(() =>
  [...props.filters.restrictions.filter((r) => r.value)].sort(
    (a, b) =>
      restrictionsTemplate.indexOf(a.value) -
      restrictionsTemplate.indexOf(b.value)
  )
)
const genres = computed(() => props.filters.genres.filter((i) => i.value))
const developers = computed(() =>
  props.filters.developers.filter((i) => i.value)
)
const franchises = computed(() =>
  props.filters.franchises.filter((i) => i.value)
)

const dividedDevelopers = computed(() => {
  const primary = []
  const secondary = []
  developers.value.forEach((developer) => {
    const includedItems = props.filters.developers.find(
      (d) => d.value === developer.value
    )
    // if (includedItems.length === 1 && includedItems[0].developers.length > 3 && includedItems[0].developers.length < 5) console.log(d)
    const percentage =
      ((includedItems?.durations.reduce((acc, cur) => acc + cur, 0) *
        includedItems?.ratings.reduce(
          (acc, cur) => acc * ratingCoefficient(cur),
          1
        )) /
        props.filters.total.duration) *
      100
    console.log(developer.value, percentage)
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

const getGenreTextClass = (genre: string) => {
  // const percentage = props.items.filter(i => i.genres.includes(genre)).length / props.items.length * 100
  const percentage =
    (props.filters.genres
      .find((g) => g.value === genre)
      ?.durations.reduce((acc, cur) => acc + cur, 0) *
      props.filters.genres
        .find((g) => g.value === genre)
        ?.ratings.reduce((acc, cur) => acc * ratingCoefficient(cur), 1)) /
    props.filters.total.duration
  return getTextSizeClass(percentage, props.filters.total.count, 'genre')
}

const getDeveloperTextClass = (developer: string) => {
  const percentage =
    (props.filters.developers.find((d) => d.value === developer)?.count /
      dividedDevelopers.value.primary.length) *
    100
  return getTextSizeClass(percentage, props.filters.total.count, 'developer')
}
</script>

<style scoped>
.aside {
  //display: flex;
  //flex-direction: column;
  row-gap: 30px;
  //width: 350px;
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
