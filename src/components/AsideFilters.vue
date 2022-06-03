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
          class="item"
          :class="{[getGenreTextClass(genre)]: true, 'item-selected': selectedGenres.includes(genre)}"
          v-for="genre in genres"
          :key="genre"
          @click="genreClick(genre)"
        >
          {{genre}}
        </el-link>
      </el-row>
    </el-col>
    <el-col>
      <h3 class="back-header">Создатели</h3>
      <el-row>
        <el-link
          class="item"
          :class="{[getDeveloperTextClass(developer)]: true, 'item-selected': selectedDevelopers.includes(developer)}"
          v-for="developer in developers"
          :key="developer"
          @click="developerClick(developer)"
        >
          {{developer}}
        </el-link>
      </el-row>
    </el-col>
    <el-col>
      <h3 class="back-header">Франшизы</h3>
      <el-row>
        <el-link
          class="item"
          :class="{[getFranchiseTextClass(franchise)]: true, 'item-selected': selectedFranchises.includes(franchise)}"
          v-for="franchise in franchises"
          :key="franchise"
          @click="franchiseClick(franchise)"
        >
          {{franchise}}
        </el-link>
      </el-row>
    </el-col>
  </el-aside>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import HorizontalBarChart from '@/components/HorizontalBarChart'
import { restrictions } from '@/data/static'

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
  },
  selectedDevelopers: {
    type: Array,
    required: true
  },
  selectedFranchises: {
    type: Array,
    required: true
  }
})

const emit = defineEmits({
  'update:selectedGrades': _ => true,
  'update:selectedRestrictions': _ => true,
  'update:selectedGenres': _ => true,
  'update:selectedDevelopers': _ => true,
  'update:selectedFranchises': _ => true
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
const selectedDevelopers = computed({
  get: () => props.selectedDevelopers,
  set: value => emit('update:selectedDevelopers', value)
})
const selectedFranchises = computed({
  get: () => props.selectedFranchises,
  set: value => emit('update:selectedFranchises', value)
})

const grades = computed(() =>
  Array.from(new Set(props.items.filter(i => i.rating).map(i => i.rating))).sort((a, b) => b - a))
const restrictionsComputed = computed(() =>
  Array.from(new Set(props.items.map(i => i.restriction))))
const restrictionsLabels = computed(() =>
  restrictions.filter(r => restrictionsComputed.value.includes(r)))
const genres = computed(() =>
  Array.from(new Set(props.items.map(i => i.genres).flat(1))))
const developers = computed(() =>
  Array.from(new Set(props.items.map(i => i.developers).flat(1))))
const franchises = computed(() =>
  Array.from(new Set(props.items.filter(i => i.franchise).map(i => i.franchise))))

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

const developerClick = (developer) => {
  if (selectedDevelopers.value.includes(developer)) {
    selectedDevelopers.value = selectedDevelopers.value.filter(d => d !== developer)
  } else {
    selectedDevelopers.value.push(developer)
  }
}

const franchiseClick = (franchise) => {
  if (selectedFranchises.value.includes(franchise)) {
    selectedFranchises.value = selectedFranchises.value.filter(f => f !== franchise)
  } else {
    selectedFranchises.value.push(franchise)
  }
}

const getCommonClass = (percentage) => {
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

const getGenreTextClass = (genre) => {
  const percentage = props.items.filter(i => i.genres.length).filter(i => i.genres.includes(genre)).length /
    props.items.length * 100
  return getCommonClass(percentage)
}

const getDeveloperTextClass = (developer) => {
  const percentage = props.items.filter(i => i.developers.length).filter(i => i.developers.includes(developer)).length /
    props.items.length * 100
  return getCommonClass(percentage)
}

const getFranchiseTextClass = (franchise) => {
  const percentage = props.items.filter(i => i.franchise).filter(i => i.franchise === franchise).length /
    franchises.value.length * 100
  return getCommonClass(percentage)
}
</script>

<style scoped>
@import "../assets/textSizes.css";

.aside {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 350px;
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

.item {
  margin: 4px 8px;
}

.item-selected {
  color: #409eff;
}
</style>
