<template>
  <el-input v-model="searchQuery" placeholder="Поиск по названию..." />
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
import { computed, ref, defineProps } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const activeItems = ref([0, 1, 2, 3, 4])
const searchQuery = ref('')

const lookingItems = computed(() => props.items.filter(item => item.status === 'looking'))
const plannedItems = computed(() => props.items.filter(item => item.status === 'planned'))
const viewedItems = computed(() => props.items.filter(item => item.status === 'viewed'))
const postponedItems = computed(() => props.items.filter(item => item.status === 'postponed'))
const abandonedItems = computed(() => props.items.filter(item => item.status === 'abandoned'))

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
