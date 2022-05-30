<template>
  <h2>Полный список</h2>
  <el-row>
    <el-col :span="18">
      <MainDisplayLayout :items="allItems" />
    </el-col>
    <el-col :span="5" :push="1">
      <el-aside class="aside">
        <el-col>
          <h3 class="back-header">Оценки</h3>
          <HorizontalBarChart
            :labels="grades"
            :data="grades.map(grade => allItems.filter(item => item.rating === grade).length)"
            :selected="selectedGrades"
            @click="gradeClick"
          />
        </el-col>
        <el-col>
          <h3 class="back-header">Возрастные ограничения</h3>
          <HorizontalBarChart
            :labels="restrictionsLabels"
            :data="restrictionsLabels.map(r => allItems.filter(item => item.restriction === r).length)"
            :selected="selectedRestrictions"
            @click="restrictionClick"
          />
        </el-col>
      </el-aside>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, ref } from 'vue'
import MainDisplayLayout from '@/components/MainDisplayLayout'
import HorizontalBarChart from '@/components/HorizontalBarChart'

const allItems = ref([
  {
    name: 'Attack on Titan',
    rating: 10,
    status: 'viewed',
    type: 'series',
    restriction: 'R+'
  },
  {
    name: 'Fairy Tail',
    rating: 10,
    status: 'postponed',
    type: 'series',
    restriction: 'R-17'
  },
  {
    name: 'One Piece',
    rating: 6,
    status: 'planned',
    type: 'series',
    restriction: 'R-17'
  },
  {
    name: 'Naruto',
    rating: 6,
    status: 'looking',
    type: 'series',
    restriction: 'PG-13'
  },
  {
    name: 'Bleach',
    rating: 9,
    status: 'abandoned',
    type: 'series',
    restriction: 'PG-13'
  },
  {
    name: 'Dragon Ball',
    rating: 6,
    status: 'looking',
    type: 'series',
    restriction: 'R-17'
  },
  {
    name: 'Re:Zero',
    rating: 10,
    status: 'viewed',
    type: 'movie',
    restriction: 'R-17'
  },
  {
    name: 'Я встретил вашу маму и очень долго не мог ей ответить на призывы дружбы, и всё-таки это получилось',
    rating: 9,
    status: 'viewed',
    restriction: 'G'
  },
  {
    name: 'Призрак в костюме',
    rating: 10,
    status: 'viewed',
    restriction: 'G'
  },
  {
    name: 'Евангелион',
    rating: 10,
    status: 'viewed',
    restriction: 'R+'
  },
  {
    name: 'Конец Евангелиона',
    rating: 4,
    status: 'viewed',
    restriction: 'R+'
  },
  {
    name: 'Куколка',
    rating: 3,
    status: 'viewed',
    restriction: 'R+'
  }
])

const selectedGrades = ref([])
const selectedRestrictions = ref([])

const grades = computed(() =>
  Array.from(new Set(allItems.value.map(i => i.rating))).sort((a, b) => b - a))
const restrictions = computed(() => Array.from(new Set(allItems.value.map(i => i.restriction))))
const restrictionsLabels = computed(() =>
  ['G', 'PG', 'PG-13', 'R-17', 'R+'].filter(r => restrictions.value.includes(r)))

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
}
</style>
