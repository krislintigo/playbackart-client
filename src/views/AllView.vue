<template>
  <el-divider />
  <el-input v-model="searchQuery" placeholder="Поиск по названию" />
  <el-divider />
  <el-collapse v-model="activeItems">
    <el-collapse-item v-for="(block, i) in displayedItems" :key="block.title" :name="i">
      <template #title>
        <el-row class="test-row">
          {{block.title}}
        </el-row>
      </template>
      <el-table :data="block.items">
        <el-table-column type="index" label="#" width="35" />
        <el-table-column sortable prop="name" label="Название" width="1200" />
        <el-table-column sortable prop="rating" label="Рейтинг" />
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeItems = ref([0, 1, 2, 3, 4])
const searchQuery = ref('')

const tableData = {
  value: [
    {
      name: 'Attack on Titan',
      rating: 10,
      status: 'viewed'
    },
    {
      name: 'One Piece',
      rating: 9,
      status: 'planned'
    },
    {
      name: 'Fairy Tail',
      rating: 8,
      status: 'postponed'
    },
    {
      name: 'Naruto',
      rating: 7,
      status: 'looking'
    },
    {
      name: 'Bleach',
      rating: 6,
      status: 'abandoned'
    },
    {
      name: 'Dragon Ball',
      rating: 5,
      status: 'looking'
    }
  ]
}

const lookingItems = computed(() => tableData.value.filter(item => item.status === 'looking'))
const plannedItems = computed(() => tableData.value.filter(item => item.status === 'planned'))
const viewedItems = computed(() => tableData.value.filter(item => item.status === 'viewed'))
const postponedItems = computed(() => tableData.value.filter(item => item.status === 'postponed'))
const abandonedItems = computed(() => tableData.value.filter(item => item.status === 'abandoned'))

const displayedItems = computed(() => [
  {
    title: 'СМОТРЮ',
    items: lookingItems.value
  },
  {
    title: 'ПРОСМОТРЕНО',
    items: viewedItems.value
  },
  {
    title: 'ЗАПЛАНИРОВАНО',
    items: plannedItems.value
  },
  {
    title: 'ОТЛОЖЕНО',
    items: postponedItems.value
  },
  {
    title: 'БРОШЕНО',
    items: abandonedItems.value
  }
])
</script>

<style scoped>
.test-row {
  font-weight: 700;
  font-size: 16px;
}
</style>
<style>
.el-collapse-item__header {
  background: #e8ebef;
  padding: 0 20px;
  border-left: 5px solid black;
  border-bottom: 0;
}
</style>
