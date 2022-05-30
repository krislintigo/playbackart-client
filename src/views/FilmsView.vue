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
    status: 'viewed'
  },
  {
    name: 'The Martian',
    rating: 8,
    status: 'abandoned'
  },
  {
    name: 'District 9',
    rating: 9,
    status: 'postponed'
  }
])
</script>

<style scoped>

</style>
