<template>
  <el-collapse v-model="activeItems">
    <div v-for="(block, i) in displayedItems" :key="block.title">
      <el-collapse-item v-if="block.paginated.length" :name="i" class="block-header">
        <template #title>
          <el-row>
            <h2 style="font-size: 18px">{{block.title}}</h2>
          </el-row>
        </template>
        <el-table :data="block.paginated">
          <el-table-column type="index" label="#" width="50" :index="indexHandler(block.pagination)" />
          <el-table-column sortable prop="name" label="Название" min-width="350">
            <template #default="scope">
              <el-popover placement="right" :width="420" trigger="hover" :show-after="300" :persistent="false">
                <template #reference>
                  <el-link>{{ scope.row.name }}</el-link>
                </template>
                <ItemPreview :item="scope.row" :editable="editable" />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column sortable prop="rating" label="Рейтинг" width="120" :sort-method="sortByRating">
            <template #default="scope">
              <el-popover placement="right" :width="380" trigger="hover" :show-after="300" :persistent="false">
                <template #reference>
                  <el-row style="width: 50%">
                    {{scope.row.rating || '-'}}
                  </el-row>
                </template>
                <el-rate :model-value="scope.row.rating" :max="10" show-text :texts="rating.texts" :colors="rating.colors" @change="updateItemRating(scope.row, $event)" />
              </el-popover>
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
                width="200"
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
        <el-pagination
          v-model:current-page="block.pagination.page"
          v-model:page-size="block.pagination.pageSize"
          hide-on-single-page
          layout="prev, pager, next"
          :page-sizes="[20, 50, 100]"
          :page-size="block.pagination.pageSize"
          :total="block.total.length"
        />
        <h4 style="margin: 5px 0">
          Общая продолжительность:
          {{formatDuration(block.total.reduce((acc, cur) => acc + cur.time.count * cur.time.duration, 0)) || '-'}}
        </h4>
      </el-collapse-item>
    </div>
  </el-collapse>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits, inject, reactive } from 'vue'
import { Delete, EditPen } from '@element-plus/icons-vue'
import ItemPreview from '@/components/ItemPreview.vue'
import formatDuration from '@/utils/formatDuration'
import { Item } from '@/interfaces/item'
import { rating } from '@/data/static'
import { ItemsAPI } from '@/api/ItemsAPI'
import { ElNotification } from 'element-plus'

const props = defineProps<{
  items: Array<Item>,
  editable: boolean,
}>()

const emit = defineEmits<{
  (e: 'update-item', item: Item): void,
  (e: 'delete-item', id: number): void
}>()

const refetch = inject('refetch') as Function

const activeItems = ref([0, 1, 2, 3, 4])

const lookingItems = computed<Item[]>(() => props.items.filter(item => item.status === 'looking'))
const lookingItemsPagination = reactive({
  page: 1,
  pageSize: 50
})
const plannedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'planned'))
const plannedItemsPagination = reactive({
  page: 1,
  pageSize: 50
})
const viewedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'viewed'))
const viewedItemsPagination = reactive({
  page: 1,
  pageSize: 50
})
const postponedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'postponed'))
const postponedItemsPagination = reactive({
  page: 1,
  pageSize: 50
})
const abandonedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'abandoned'))
const abandonedItemsPagination = reactive({
  page: 1,
  pageSize: 50
})

const displayedItems = computed(() => [
  {
    title: 'В ПРОЦЕССЕ',
    paginated: lookingItems.value.slice(
      (lookingItemsPagination.page - 1) * lookingItemsPagination.pageSize,
      lookingItemsPagination.page * lookingItemsPagination.pageSize
    ),
    total: lookingItems.value,
    pagination: lookingItemsPagination
  },
  {
    title: 'ЗАПЛАНИРОВАНО',
    paginated: plannedItems.value.slice(
      (plannedItemsPagination.page - 1) * plannedItemsPagination.pageSize,
      plannedItemsPagination.page * plannedItemsPagination.pageSize
    ),
    total: plannedItems.value,
    pagination: plannedItemsPagination
  },
  {
    title: 'ЗАВЕРШЕНО',
    paginated: viewedItems.value.slice(
      (viewedItemsPagination.page - 1) * viewedItemsPagination.pageSize,
      viewedItemsPagination.page * viewedItemsPagination.pageSize
    ),
    total: viewedItems.value,
    pagination: viewedItemsPagination
  },
  {
    title: 'ОТЛОЖЕНО',
    paginated: postponedItems.value.slice(
      (postponedItemsPagination.page - 1) * postponedItemsPagination.pageSize,
      postponedItemsPagination.page * postponedItemsPagination.pageSize
    ),
    total: postponedItems.value,
    pagination: postponedItemsPagination
  },
  {
    title: 'БРОШЕНО',
    paginated: abandonedItems.value.slice(
      (abandonedItemsPagination.page - 1) * abandonedItemsPagination.pageSize,
      abandonedItemsPagination.page * abandonedItemsPagination.pageSize
    ),
    total: abandonedItems.value,
    pagination: abandonedItemsPagination
  }
])

const indexHandler = (pagination: any) => (index: number) => (pagination.page - 1) * pagination.pageSize + index + 1

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

const updateItemRating = async (item: Item, rating: number) => {
  try {
    await ItemsAPI.update(item.id, { rating } as Item)
    refetch()
    ElNotification.success({
      title: 'Рейтинг изменен',
      position: 'bottom-right'
    })
  } catch (error: any) {
    ElNotification.error({
      title: error.response.data.message,
      position: 'bottom-right'
    })
  }
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

.el-table .el-table__cell .cell {
  padding-right: 0;
}

.el-link__inner {
  word-break: normal;
}
</style>
