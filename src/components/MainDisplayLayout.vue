<template>
  <el-collapse v-model="activeItems">
    <el-collapse-item v-for="(block, i) in displayedItems" :key="block.title" :name="i">
      <template #title>
        <el-row class="block-header">
          <h2 style="font-size: 18px">{{block.title}}</h2>
        </el-row>
      </template>
      <el-table :data="block.items">
        <el-table-column type="index" label="#" width="40" />
        <el-table-column sortable prop="name" label="Название" width="750">
          <template #default="scope">
            <el-link>{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column sortable prop="rating" label="Рейтинг" />
        <el-table-column sortable prop="time" label="Длительность" :sort-method="sortByDuration">
          <template #default="scope">
            <span v-if="scope.row.time.count > 1">{{ scope.row.time.count }} x </span>
            <span>{{formatDuration(scope.row.time.duration)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <h4 style="margin: 5px 0">
        Общая продолжительность:
        {{formatDuration(block.items.reduce((acc, cur) => acc + cur.time.count * cur.time.duration, 0))}}
      </h4>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue'
import formatDuration from '@/utils/formatDuration'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const activeItems = ref([0, 1, 2, 3, 4])

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
    title: 'ЗАПЛАНИРОВАНО',
    items: plannedItems.value
  },
  {
    title: 'ПРОСМОТРЕНО',
    items: viewedItems.value
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

const sortByDuration = (a, b) => {
  const totalA = a.time.count * a.time.duration
  const totalB = b.time.count * b.time.duration
  if (totalA === totalB) return 0
  return totalA > totalB ? 1 : -1
}
</script>

<style scoped>
.block-header {
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

.el-table {
  --el-table-border-color: transparent;
}

.el-table .el-table__cell {
  padding: 3px 0;
}
</style>
