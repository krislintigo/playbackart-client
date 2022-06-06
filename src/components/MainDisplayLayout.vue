<template>
  <el-collapse v-model="activeItems">
    <div v-for="(block, i) in displayedItems" :key="block.title">
      <el-collapse-item v-if="block.items.length" :name="i" class="block-header">
        <template #title>
          <el-row>
            <h2 style="font-size: 18px">{{block.title}}</h2>
          </el-row>
        </template>
        <el-table :data="block.items">
          <el-table-column type="index" label="#" width="50" />
          <el-table-column sortable prop="name" label="Название" min-width="350">
            <template #default="scope">
              <el-popover placement="right" :width="420" trigger="hover" :show-after="500" :persistent="false">
                <template #reference>
                  <el-link>{{ scope.row.name }}</el-link>
                </template>
                <ItemPreview :item="scope.row" :editable="editable" />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column sortable prop="rating" label="Рейтинг" width="120" :sort-method="sortByRating">
            <template #default="scope">
              <span v-if="!scope.row.rating">-</span>
              <span v-else>{{scope.row.rating}}</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="time" label="Длительность" width="170" :sort-method="sortByDuration">
            <template #default="scope">
              <span v-if="!scope.row.time.duration">-</span>
              <div v-else>
                <span v-if="scope.row.time.count > 1">{{ scope.row.time.count }} x </span>
                <span>{{formatDuration(scope.row.time.duration)}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="editable" label="Операции" width="100">
            <template #default="scope">
              <el-button :icon="EditPen" type="warning" circle size="small" text @click="emit('update-item', scope.row)" />
              <el-popconfirm
                title="Вы действительно хотите удалить?"
                confirm-button-text="Да"
                cancel-button-text="Нет"
                @confirm="emit('delete-item', scope.row.id)"
              >
                <template #reference>
                  <el-button :icon="Delete" type="danger" circle size="small" text />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <h4 style="margin: 5px 0">
          Общая продолжительность:
          {{formatDuration(block.items.reduce((acc, cur) => acc + cur.time.count * cur.time.duration, 0)) || '-'}}
        </h4>
      </el-collapse-item>
    </div>
  </el-collapse>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits } from 'vue'
import { Delete, EditPen } from '@element-plus/icons-vue'
import ItemPreview from '@/components/ItemPreview.vue'
import formatDuration from '@/utils/formatDuration'
import { Item } from '@/interfaces/item'

const props = defineProps<{
  items: Array<Item>,
  editable: boolean,
}>()

const emit = defineEmits<{
  (e: 'update-item', item: Item): void,
  (e: 'delete-item', id: number): void
}>()

const activeItems = ref([0, 1, 2, 3, 4])

const lookingItems = computed<Item[]>(() => props.items.filter(item => item.status === 'looking'))
const plannedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'planned'))
const viewedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'viewed'))
const postponedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'postponed'))
const abandonedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'abandoned'))

const displayedItems = computed(() => [
  {
    title: 'В ПРОЦЕССЕ',
    items: lookingItems.value
  },
  {
    title: 'ЗАПЛАНИРОВАНО',
    items: plannedItems.value
  },
  {
    title: 'ЗАВЕРШЕНО',
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

const sortByRating = (a: Item, b: Item) => {
  if (!a.rating || !b.rating) return -1
  if (a.rating === b.rating) {
    return 0
  }
  return a.rating > b.rating ? -1 : 1
}

const sortByDuration = (a: Item, b: Item) => {
  if (!a.time || !b.time) return -1
  const totalA = a.time.count * a.time.duration
  const totalB = b.time.count * b.time.duration
  if (totalA === totalB) return 0
  return totalA > totalB ? 1 : -1
}
</script>

<style scoped>

</style>
<style>
.block-header .el-collapse-item__header {
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

.el-link__inner {
  word-break: normal;
}
</style>
