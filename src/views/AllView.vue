<template>
  <MainDisplayLayout :items="data" />
</template>

<script setup>
import { ref } from 'vue'
import MainDisplayLayout from '@/components/MainDisplayLayout'

const data = ref([
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
  }
])
</script>

<style scoped>

</style>
