<template>
  <h2>Полный список</h2>
  <el-row>
    <el-col :span="18">
      <el-input v-model="searchQuery" placeholder="Поиск по названию..." clearable />
      <el-divider />
      <MainDisplayLayout :items="queriedItems" />
    </el-col>
    <el-col :span="5" :push="1">
      <AsideFilters
        :items="allItems"
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

const allItems = ref([
  {
    name: 'Attack on Titan',
    image: 'https://static.zerochan.net/104th.Trainees.Squad.full.1779661.jpg',
    rating: 10,
    status: 'viewed',
    type: 'series',
    restriction: 'R+',
    genres: ['Экшен', 'Триллер', 'Военное'],
    time: {
      count: 25,
      duration: 25
    }
  },
  {
    name: 'Fairy Tail',
    rating: 10,
    status: 'postponed',
    type: 'series',
    restriction: 'R-17',
    genres: ['Экшен', 'Психологическое', 'Фантастика'],
    time: {
      count: 25,
      duration: 25
    }
  },
  {
    name: 'One Piece',
    rating: 6,
    status: 'planned',
    type: 'series',
    restriction: 'R-17',
    genres: ['Экшен', 'Приключения', 'Фантастика'],
    time: {
      count: 25,
      duration: 25
    }
  },
  {
    name: 'Naruto',
    rating: 6,
    status: 'looking',
    type: 'series',
    restriction: 'PG-13',
    genres: ['Экшен', 'Приключения', 'Фантастика'],
    time: {
      count: 520,
      duration: 23
    }
  },
  {
    name: 'Bleach',
    rating: 9,
    status: 'abandoned',
    type: 'series',
    restriction: 'PG-13',
    genres: ['Экшен', 'Приключения', 'Фантастика'],
    time: {
      count: 24,
      duration: 25
    }
  },
  {
    name: 'Dragon Ball',
    rating: 6,
    status: 'looking',
    type: 'series',
    restriction: 'R-17',
    genres: ['Экшен', 'Приключения', 'Фантастика'],
    time: {
      count: 25,
      duration: 25
    }
  },
  {
    name: 'Re:Zero',
    rating: 10,
    status: 'viewed',
    type: 'movie',
    restriction: 'R-17',
    genres: ['Экшен', 'Приключения', 'Фантастика'],
    time: {
      count: 24,
      duration: 24
    }
  },
  {
    name: 'Я встретил вашу маму и очень долго не мог ей ответить на призывы дружбы, и всё-таки это получилось',
    rating: 9,
    status: 'viewed',
    restriction: 'G',
    genres: ['Драма', 'Комедия', 'Романтика'],
    time: {
      count: 12,
      duration: 24
    }
  },
  {
    name: 'Призрак в костюме',
    rating: 10,
    status: 'viewed',
    restriction: 'G',
    genres: ['Экшен', 'Фантастика'],
    time: {
      count: 12,
      duration: 24
    }
  },
  {
    name: 'Евангелион',
    rating: 10,
    status: 'viewed',
    restriction: 'R+',
    genres: ['Меха', 'Приключения', 'Научная фантастика'],
    time: {
      count: 24,
      duration: 25
    }
  },
  {
    name: 'Конец Евангелиона',
    rating: 4,
    status: 'viewed',
    restriction: 'R+',
    genres: ['Меха', 'Приключения', 'Научная фантастика'],
    time: {
      count: 1,
      duration: 48
    }
  },
  {
    name: 'Куколка',
    rating: 3,
    status: 'viewed',
    restriction: 'R+',
    genres: ['Трагедия', 'Фантастика'],
    time: {
      count: 5,
      duration: 7
    }
  }
])

// FILTERS
const {
  searchQuery,
  selectedGrades,
  selectedRestrictions,
  selectedGenres,
  queriedItems
} = useFilters(allItems)
</script>

<style scoped>

</style>
