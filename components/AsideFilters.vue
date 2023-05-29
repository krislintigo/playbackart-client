<template lang="pug">
el-aside.aside
  el-row
    el-col
      h3.back-header Оценки
      HorizontalBarChart(
        :labels='grades',
        :data='grades.map((grade) => items.filter((i) => i.rating === grade).length)',
        :selected='selectedGrades',
        @click='gradeClick'
      )
  //el-col
  //  h3.back-header Возрастные ограничения
  //  HorizontalBarChart(
  //    :labels='restrictionsLabels',
  //    :data='restrictionsLabels.map((r) => items.filter((i) => i.restriction === r).length)',
  //    :selected='selectedRestrictions',
  //    @click='restrictionClick'
  //  )
  el-row
    el-col
      h3.back-header Жанры
      el-row
        el-link.item(
          v-for='genre in genres',
          :key='genre',
          :class='{ [getGenreTextClass(genre)]: true, "item-selected": selectedGenres.includes(genre) }',
          @click='genreClick(genre)'
        ) {{ genre }}
  el-row
    el-col
      h3.back-header Создатели
      el-row
        el-link.item(
          v-for='developer in dividedDevelopers.primary',
          :key='developer',
          :class='{ [getDeveloperTextClass(developer)]: true, "item-selected": selectedDevelopers.includes(developer) }',
          @click='developerClick(developer)'
        ) {{ developer }}
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
            :label='item',
            :value='item'
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
          :label='item',
          :value='item'
        )
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedGrades: number[]
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
  }
}>()

const emit = defineEmits<{
  (e: 'update:selectedGrades', value: number[]): void
  (e: 'update:selectedRestrictions', value: string[]): void
  (e: 'update:selectedGenres', value: string[]): void
  (e: 'update:selectedDevelopers', value: string[]): void
  (e: 'update:selectedFranchises', value: string[]): void
}>()

const selectedGrades = computed({
  get: () => props.selectedGrades,
  set: (value) => emit('update:selectedGrades', value),
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
  Array.from(new Set(props.filters.ratings.filter((i) => i.value))).sort(
    (a, b) => b.value - a.value
  )
)
const restrictionsComputed = computed(() =>
  Array.from(new Set(props.items.map((i) => i.restriction)))
)
const restrictionsLabels = computed(() =>
  restrictions.filter((r) => restrictionsComputed.value.includes(r))
)
const genres = computed(() =>
  Array.from(new Set(props.filters.genres.filter((i) => i.value)))
)
const developers = computed(() =>
  Array.from(new Set(props.filters.developers.filter((i) => i.value)))
)
const franchises = computed(() =>
  Array.from(new Set(props.filters.franchises.filter((i) => i.value)))
)

const dividedDevelopers = computed(() => {
  const primary: string[] = []
  const secondary: string[] = []
  developers.value.forEach((d) => {
    const includedItems = props.items.filter((i) => i.developers.includes(d))
    // if (includedItems.length === 1 && includedItems[0].developers.length > 3 && includedItems[0].developers.length < 5) console.log(d)
    const percentage =
      ((includedItems.reduce(
        (acc, item) => acc + item.time.count * item.time.duration,
        0
      ) *
        includedItems.reduce(
          (acc, item) => acc * ratingCoefficient(item.rating),
          1
        )) /
        props.items.reduce(
          (acc, item) => acc + item.time.count * item.time.duration,
          0
        )) *
      100
    if (percentage > 5) {
      primary.push(d)
    } else {
      secondary.push(d)
    }
  })
  return { primary, secondary }
})

const gradeClick = (gradeIndex: number) => {
  const grade = grades.value[gradeIndex]
  if (selectedGrades.value.includes(grade)) {
    selectedGrades.value = selectedGrades.value.filter((g) => g !== grade)
  } else {
    selectedGrades.value.push(grade)
  }
}

const restrictionClick = (restrictionIndex: number) => {
  const restriction = restrictionsLabels.value[restrictionIndex]
  if (selectedRestrictions.value.includes(restriction)) {
    selectedRestrictions.value = selectedRestrictions.value.filter(
      (r) => r !== restriction
    )
  } else {
    selectedRestrictions.value.push(restriction)
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
    (props.items
      .filter((i) => i.genres.includes(genre))
      .reduce((acc, item) => acc + item.time.count * item.time.duration, 0) *
      props.items
        .filter((i) => i.genres.includes(genre))
        .reduce((acc, item) => acc * ratingCoefficient(item.rating), 1)) /
    props.items.reduce(
      (acc, item) => acc + item.time.count * item.time.duration,
      0
    )
  return getTextSizeClass(percentage, props.items.length, 'genre')
}

const getDeveloperTextClass = (developer: string) => {
  const percentage =
    (props.items.filter((i) => i.developers.includes(developer)).length /
      dividedDevelopers.value.primary.length) *
    100
  return getTextSizeClass(percentage, props.items.length, 'developer')
}
</script>

<style scoped>
.aside {
  //display: flex;
  //flex-direction: column;
  row-gap: 30px;
  width: 350px;
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
