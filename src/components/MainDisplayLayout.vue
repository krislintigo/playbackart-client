<template>
  <el-collapse v-model="activeItems">
    <div v-for="(block, i) in displayedItems" :key="block.title">
      <el-collapse-item v-if="block.paginated.length" :name="i" class="block-header">
        <template #title>
          <el-row>
            <h2 style="font-size: 18px">{{block.title}}</h2>
          </el-row>
        </template>
        <el-table :data="block.paginated" @sort-change="onSortChange(i, $event)">
          <el-table-column type="index" label="#" width="50" :index="indexHandler(block.data.pagination)" />
          <el-table-column sortable="custom" prop="name" label="Название" min-width="350">
            <template #default="scope">
              <el-popover placement="right" :width="420" trigger="hover" :show-after="300" :persistent="false">
                <template #reference>
                  <el-link>{{ scope.row.name }}</el-link>
                </template>
                <ItemPreview :item="scope.row" :editable="editable" />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="rating" label="Рейтинг" width="120">
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
          <el-table-column sortable="custom" prop="time" label="Длительность" width="170">
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
          v-model:current-page="block.data.pagination.page"
          v-model:page-size="block.data.pagination.pageSize"
          hide-on-single-page
          layout="prev, pager, next"
          :page-sizes="[20, 50, 100]"
          :page-size="block.data.pagination.pageSize"
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

type Sort = {
  prop: 'name' | 'rating' | 'time' | null,
  order: 'ascending' | 'descending' | null
}

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

const lookingItemsData = reactive({
  pagination: {
    page: 1,
    pageSize: 50
  },
  sort: {
    prop: 'name',
    order: null
  } as Sort
})
const lookingItems = computed<Item[]>(() => props.items.filter(item => item.status === 'looking').sort(sortBy(lookingItemsData.sort)))
const plannedItemsData = reactive({
  pagination: {
    page: 1,
    pageSize: 50
  },
  sort: {
    prop: 'name',
    order: null
  } as Sort
})
const plannedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'planned').sort(sortBy(plannedItemsData.sort)))
const viewedItemsData = reactive({
  pagination: {
    page: 1,
    pageSize: 50
  },
  sort: {
    prop: 'name',
    order: null
  } as Sort
})
const viewedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'viewed').sort(sortBy(viewedItemsData.sort)))
const postponedItemsData = reactive({
  pagination: {
    page: 1,
    pageSize: 50
  },
  sort: {
    prop: 'name',
    order: null
  } as Sort
})
const postponedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'postponed').sort(sortBy(postponedItemsData.sort)))
const abandonedItemsData = reactive({
  pagination: {
    page: 1,
    pageSize: 50
  },
  sort: {
    prop: 'name',
    order: null
  } as Sort
})
const abandonedItems = computed<Item[]>(() => props.items.filter(item => item.status === 'abandoned').sort(sortBy(abandonedItemsData.sort)))

const displayedItems = computed(() => [
  {
    title: 'В ПРОЦЕССЕ',
    paginated: lookingItems.value.slice(
      (lookingItemsData.pagination.page - 1) * lookingItemsData.pagination.pageSize,
      lookingItemsData.pagination.page * lookingItemsData.pagination.pageSize
    ),
    total: lookingItems.value,
    data: lookingItemsData
  },
  {
    title: 'ЗАПЛАНИРОВАНО',
    paginated: plannedItems.value.slice(
      (plannedItemsData.pagination.page - 1) * plannedItemsData.pagination.pageSize,
      plannedItemsData.pagination.page * plannedItemsData.pagination.pageSize
    ),
    total: plannedItems.value,
    data: plannedItemsData
  },
  {
    title: 'ЗАВЕРШЕНО',
    paginated: viewedItems.value.slice(
      (viewedItemsData.pagination.page - 1) * viewedItemsData.pagination.pageSize,
      viewedItemsData.pagination.page * viewedItemsData.pagination.pageSize
    ),
    total: viewedItems.value,
    data: viewedItemsData
  },
  {
    title: 'ОТЛОЖЕНО',
    paginated: postponedItems.value.slice(
      (postponedItemsData.pagination.page - 1) * postponedItemsData.pagination.pageSize,
      postponedItemsData.pagination.page * postponedItemsData.pagination.pageSize
    ),
    total: postponedItems.value,
    data: postponedItemsData
  },
  {
    title: 'БРОШЕНО',
    paginated: abandonedItems.value.slice(
      (abandonedItemsData.pagination.page - 1) * abandonedItemsData.pagination.pageSize,
      abandonedItemsData.pagination.page * abandonedItemsData.pagination.pageSize
    ),
    total: abandonedItems.value,
    data: abandonedItemsData
  }
])

const indexHandler = (pagination: any) => (index: number) => (pagination.page - 1) * pagination.pageSize + index + 1

const onSortChange = (index: number, { prop, order }: Sort) => {
  displayedItems.value[index].data.sort.prop = prop
  displayedItems.value[index].data.sort.order = order
}

const sortBy = ({ prop, order }: Sort) => {
  switch (prop) {
    case 'name':
      return sortByName(order)
    case 'rating':
      return sortByRating(order)
    case 'time':
      return sortByDuration(order)
    default:
      return sortByName('ascending')
  }
}

const sortByName = (order: Sort['order']) => (a: Item, b: Item) => {
  if (!order) return 0
  return a.name.localeCompare(b.name) * (order === 'ascending' ? 1 : -1)
}

const sortByRating = (order: Sort['order']) => (a: Item, b: Item) => {
  if (!order) return 0
  const mult = order === 'ascending' ? 1 : -1
  if (!a.rating || !b.rating) return -1 * mult
  if (a.rating === b.rating) {
    return 0
  }
  return a.rating > b.rating ? -1 * mult : 1 * mult
}

const sortByDuration = (order: Sort['order']) => (a: Item, b: Item) => {
  if (!order) return 0
  const mult = order === 'ascending' ? 1 : -1
  if (!a.time || !b.time) return -1 * mult
  const totalA = a.time.count * a.time.duration
  const totalB = b.time.count * b.time.duration
  if (totalA === totalB) return 0
  return totalA > totalB ? 1 * mult : -1 * mult
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
  background-color: var(--el-color-info-light-8);
  padding: 0 20px;
  border-left: 5px solid var(--el-text-color-primary);
  border-bottom: 0;
}

.el-table {
  --el-table-border-color: transparent;
  --el-table-header-bg-color: transparent;
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
