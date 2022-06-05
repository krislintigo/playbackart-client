<template>
  <el-aside class="aside">
    <el-col>
      <h3 class="back-header">Оценки</h3>
      <HorizontalBarChart
        :labels="grades"
        :data="grades.map(grade => items.filter(i => i.rating === grade).length)"
        :selected="selectedGrades"
        @click="gradeClick"
      />
    </el-col>
    <el-col>
      <h3 class="back-header">Возрастные ограничения</h3>
      <HorizontalBarChart
        :labels="restrictionsLabels"
        :data="restrictionsLabels.map(r => items.filter(i => i.restriction === r).length)"
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
      <el-select
        v-model="selectedFranchises"
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Введите название тут"
        style="width: 100%"
      >
        <el-option
          v-for="item in franchises"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-col>
  </el-aside>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import HorizontalBarChart from '@/components/HorizontalBarChart.vue'
import { restrictions } from '@/data/static'
import { getTextSizeClass } from '@/utils/getTextSizeClass'
import { CreateItem } from '@/interfaces/create-item'

const props = defineProps<{
  items: Array<CreateItem>,
  selectedGrades: Array<number>,
  selectedRestrictions: Array<string>,
  selectedGenres: Array<string>,
  selectedDevelopers: Array<string>,
  selectedFranchises: Array<string>,
}>()

const emit = defineEmits<{
  (e: 'update:selectedGrades', value: number[]): void,
  (e: 'update:selectedRestrictions', value: string[]): void,
  (e: 'update:selectedGenres', value: string[]): void,
  (e: 'update:selectedDevelopers', value: string[]): void,
  (e: 'update:selectedFranchises', value: string[]): void
}>()

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

const gradeClick = (gradeIndex: number) => {
  const grade = grades.value[gradeIndex]
  if (selectedGrades.value.includes(grade)) {
    selectedGrades.value = selectedGrades.value.filter(g => g !== grade)
  } else {
    selectedGrades.value.push(grade)
  }
}

const restrictionClick = (restrictionIndex: number) => {
  const restriction = restrictionsLabels.value[restrictionIndex]
  if (selectedRestrictions.value.includes(restriction)) {
    selectedRestrictions.value = selectedRestrictions.value.filter(r => r !== restriction)
  } else {
    selectedRestrictions.value.push(restriction)
  }
}

const genreClick = (genre: string) => {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter(g => g !== genre)
  } else {
    selectedGenres.value.push(genre)
  }
}

const developerClick = (developer: string) => {
  if (selectedDevelopers.value.includes(developer)) {
    selectedDevelopers.value = selectedDevelopers.value.filter(d => d !== developer)
  } else {
    selectedDevelopers.value.push(developer)
  }
}

const getGenreTextClass = (genre: string) => {
  const percentage = props.items.filter(i => i.genres.includes(genre)).length / props.items.length * 100
  return getTextSizeClass(percentage, 'genre')
}

const getDeveloperTextClass = (developer: string) => {
  const percentage = props.items.filter(i => i.developers.includes(developer)).length /
    props.items.length * 100
  return getTextSizeClass(percentage, 'developer')
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
