<template>
  <h2>Полный список</h2>
  <el-row>
    <el-col :span="18">
      <MainDisplayLayout :items="allItems" />
    </el-col>
    <el-col :span="5" :push="1">
      <el-aside>
        <h3 class="back-header">Оценки</h3>
        <BarChart
          :labels="grades"
          :data="grades.map(grade => allItems.filter(item => item.rating === grade).length)"
        />
        <h3 class="back-header">Возрастные ограничения</h3>
        <BarChart
          :labels="['G', 'PG', 'PG-13', 'R-17', 'R+'].filter(r => restrictions.includes(r))"
          :data="['G', 'PG', 'PG-13', 'R-17', 'R+'].filter(r => restrictions.includes(r)).map(r => allItems.filter(item => item.restriction === r).length)"
        />
      </el-aside>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, ref } from 'vue'
import MainDisplayLayout from '@/components/MainDisplayLayout'
import BarChart from '@/components/HorizontalBarChart'

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
  }
])

const grades = computed(() =>
  Array.from(new Set(allItems.value.map(i => i.rating))).sort((a, b) => b - a))
const restrictions = computed(() => Array.from(new Set(allItems.value.map(i => i.restriction))))
</script>

<style scoped>
.back-header {
  background-color: #e8ebef;
  padding: 10px;
  margin-top: 0;
  margin-bottom: 10px;
  border-left: 5px solid black;
}
</style>
