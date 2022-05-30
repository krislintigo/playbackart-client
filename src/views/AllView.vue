<template>
  <h2>Полный список</h2>
  <el-row>
    <el-col :span="18">
      <MainDisplayLayout :items="allItems" />
    </el-col>
    <el-col :span="5" :push="1">
      <el-aside>
        <h3 class="back-header">Оценки</h3>
        <BarChart />
      </el-aside>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import MainDisplayLayout from '@/components/MainDisplayLayout'
import BarChart from '@/components/HorizontalBarChart'

const allItems = ref([
  {
    name: 'Attack on Titan',
    rating: 10,
    status: 'viewed',
    type: 'series'
  },
  {
    name: 'One Piece',
    rating: 9,
    status: 'planned',
    type: 'series'
  },
  {
    name: 'Fairy Tail',
    rating: 8,
    status: 'postponed',
    type: 'series'
  },
  {
    name: 'Naruto',
    rating: 7,
    status: 'looking',
    type: 'series'
  },
  {
    name: 'Bleach',
    rating: 6,
    status: 'abandoned',
    type: 'series'
  },
  {
    name: 'Dragon Ball',
    rating: 5,
    status: 'looking',
    type: 'series'
  },
  {
    name: 'Re:Zero',
    rating: 9,
    status: 'viewed',
    type: 'movie'
  },
  {
    name: 'Я встретил вашу маму и очень долго не мог ей ответить на призывы дружбы, и всё-таки это получилось',
    rating: 9,
    status: 'viewed'
  }
])
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
