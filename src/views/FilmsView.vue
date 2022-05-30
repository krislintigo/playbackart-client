<template>
  <h2>Список фильмов</h2>
  <el-row>
    <el-col :span="18">
      <el-input v-model="searchQuery" placeholder="Поиск по названию..." clearable />
      <el-divider />
      <MainDisplayLayout :items="queriedItems" />
    </el-col>
    <el-col :span="5" :push="1">
      <AsideFilters
        :items="films"
        v-model:selected-grades="selectedGrades"
        v-model:selected-restrictions="selectedRestrictions"
        v-model:selected-genres="selectedGenres"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { useFilters } from '@/composables/filters'
import MainDisplayLayout from '@/components/MainDisplayLayout'
import AsideFilters from '@/components/AsideFilters'

const films = ref([
  {
    name: 'Interstellar',
    image: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: 10,
    status: 'viewed',
    type: 'movie',
    restriction: 'PG-13',
    genres: ['Драма', 'Приключения', 'Фантастика'],
    time: {
      count: 1,
      duration: 169
    }
  },
  {
    name: 'The Martian',
    image: 'https://www.1c-interes.ru/images/2020/03/29387162_Marsianin_DVD.jpg',
    rating: 8,
    status: 'abandoned',
    type: 'movie',
    restriction: 'PG-13',
    genres: ['Приключения', 'Фантастика'],
    time: {
      count: 1,
      duration: 144
    }
  },
  {
    name: 'District 9',
    image: 'https://picfiles.alphacoders.com/147/147334.jpg',
    rating: 9,
    status: 'postponed',
    type: 'movie',
    restriction: 'R-17',
    genres: ['Триллер', 'Боевик', 'Драма', 'Фантастика'],
    time: {
      count: 1,
      duration: 112
    }
  }
])

const {
  searchQuery,
  selectedGrades,
  selectedRestrictions,
  selectedGenres,
  queriedItems
} = useFilters(films)
</script>

<style scoped>

</style>
