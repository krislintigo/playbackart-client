<template>
  <h2>Список фильмов</h2>
  <MainDisplayLayout :items="films" />
</template>

<script setup>
import { ref } from 'vue'
import MainDisplayLayout from '@/components/MainDisplayLayout'

const films = ref([
  {
    name: 'Interstellar',
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
    rating: 9,
    status: 'postponed',
    type: 'movie',
    restriction: 'PG-13',
    genres: ['Триллер', 'Боевик', 'Драма', 'Фантастика'],
    time: {
      count: 1,
      duration: 112
    }
  }
])
</script>

<style scoped>

</style>
