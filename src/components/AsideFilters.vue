<template>
  <el-aside class="aside">
    <el-col>
      <h3 class="back-header">Оценки</h3>
      <HorizontalBarChart
        :labels="grades"
        :data="grades.map(grade => items.filter(item => item.rating === grade).length)"
        :selected="selectedGrades"
        @click="gradeClick"
      />
    </el-col>
    <el-col>
      <h3 class="back-header">Возрастные ограничения</h3>
      <HorizontalBarChart
        :labels="restrictionsLabels"
        :data="restrictionsLabels.map(r => items.filter(item => item.restriction === r).length)"
        :selected="selectedRestrictions"
        @click="restrictionClick"
      />
    </el-col>
    <el-col>
      <h3 class="back-header">Жанры</h3>
      <el-row>
        <el-link
          class="genre-item"
          :class="{[getGenreTextClass(genre)]: true, 'genre-selected': selectedGenres.includes(genre)}"
          v-for="genre in genres"
          :key="genre"
          @click="genreClick(genre)"
        >
          {{genre}}
        </el-link>
      </el-row>
    </el-col>
  </el-aside>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import HorizontalBarChart from '@/components/HorizontalBarChart'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  selectedGrades: {
    type: Array,
    required: true
  },
  selectedRestrictions: {
    type: Array,
    required: true
  },
  selectedGenres: {
    type: Array,
    required: true
  }
})

const emit = defineEmits({
  'update:selectedGrades': _ => true,
  'update:selectedRestrictions': _ => true,
  'update:selectedGenres': _ => true
})

const selectedGrades = computed({
  get: () => props.selectedGrades,
  set: value => emit('update:selectedGrades', value)
})
const selectedRestrictions = computed({
  get: () => props.selectedRestrictions,
  set: value => emit('update:selectedRestrictions', value)
})
const selectedGenres = computed({
  get: () => props.selectedGenres,
  set: value => emit('update:selectedGenres', value)
})

const grades = computed(() =>
  Array.from(new Set(props.items.map(i => i.rating))).sort((a, b) => b - a))
const restrictions = computed(() => Array.from(new Set(props.items.map(i => i.restriction))))
const restrictionsLabels = computed(() =>
  ['G', 'PG', 'PG-13', 'R-17', 'R+'].filter(r => restrictions.value.includes(r)))
const genres = computed(() => Array.from(new Set(props.items.map(i => i.genres).flat(1))))

const gradeClick = (gradeIndex) => {
  const grade = grades.value[gradeIndex]
  if (selectedGrades.value.includes(grade)) {
    selectedGrades.value = selectedGrades.value.filter(g => g !== grade)
  } else {
    selectedGrades.value.push(grade)
  }
}

const restrictionClick = (restrictionIndex) => {
  const restriction = restrictionsLabels.value[restrictionIndex]
  if (selectedRestrictions.value.includes(restriction)) {
    selectedRestrictions.value = selectedRestrictions.value.filter(r => r !== restriction)
  } else {
    selectedRestrictions.value.push(restriction)
  }
}

const genreClick = (genre) => {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter(g => g !== genre)
  } else {
    selectedGenres.value.push(genre)
  }
}

const getGenreTextClass = (genre) => {
  const percentage = props.items.filter(i => i.genres.includes(genre)).length / props.items.length * 100
  // fix this later to be more good
  switch (true) {
    case percentage > 50:
      return 'text4'
    case percentage > 35:
      return 'text3'
    case percentage > 20:
      return 'text2'
    case percentage > 10:
      return 'text1'
    default:
      return 'text0'
  }
}
</script>

<style scoped>
.aside {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

.back-header {
  background-color: #e8ebef;
  padding: 10px;
  margin-top: 0;
  margin-bottom: 10px;
  border-left: 5px solid black;
  font-size: 16px;
  text-transform: uppercase;
}

.genre-item {
  margin: 4px 8px;
}

.genre-selected {
  color: #409eff;
}

.text0 {
  font-size: 10px;
}
.text1 {
  font-size: 12px;
}
.text2 {
  font-size: 13px;
}
.text3 {
  font-size: 14px;
  font-weight: bold;
}
.text4 {
  font-size: 16px;
  font-weight: bold;
}
</style>
