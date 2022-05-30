<template>
  <h2>Полный список</h2>
  <el-row>
    <el-col :span="18">
      <el-input v-model="searchQuery" placeholder="Поиск по названию..." clearable />
      <el-divider />
      <MainDisplayLayout :items="queriedItems" />
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
        <el-col>
          <h3 class="back-header">Жанры</h3>
          <el-row>
            <el-link
              class="genre-item"
              :class="{[getGenreTextClass(genre)]: true, 'genre-selected': selectedGenres.includes(genre)}"
              v-for="genre in genres"
              :key="genre"
              @click="genreClick(genre)"
            >
              {{genre}}
            </el-link>
          </el-row>
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
const searchQuery = ref('')
const selectedGrades = ref([])
const selectedRestrictions = ref([])
const selectedGenres = ref([])

const grades = computed(() =>
  Array.from(new Set(allItems.value.map(i => i.rating))).sort((a, b) => b - a))
const restrictions = computed(() => Array.from(new Set(allItems.value.map(i => i.restriction))))
const restrictionsLabels = computed(() =>
  ['G', 'PG', 'PG-13', 'R-17', 'R+'].filter(r => restrictions.value.includes(r)))
const genres = computed(() => Array.from(new Set(allItems.value.map(i => i.genres).flat(1))))

const queriedItems = computed(() => {
  const searchFilter = allItems.value.filter(i => i.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  const gradeFilter = selectedGrades.value.length
    ? searchFilter.filter(i => selectedGrades.value.includes(i.rating))
    : searchFilter
  const restrictionFilter = selectedRestrictions.value.length
    ? gradeFilter.filter(i => selectedRestrictions.value.includes(i.restriction))
    : gradeFilter
  return selectedGenres.value.length
    ? restrictionFilter.filter(i => selectedGenres.value.some(g => i.genres.includes(g)))
    : restrictionFilter
})

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

const getGenreTextClass = (genre) => {
  const percentage = allItems.value.filter(i => i.genres.includes(genre)).length / allItems.value.length * 100
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
  font-size: 16px;
  text-transform: uppercase;
}

.genre-item {
  margin: 4px 8px;
}

.genre-selected {
  color: #409eff;
}

.text0 {
  font-size: 10px;
}
.text1 {
  font-size: 12px;
}
.text2 {
  font-size: 13px;
}
.text3 {
  font-size: 14px;
  font-weight: bold;
}
.text4 {
  font-size: 16px;
  font-weight: bold;
}
</style>
