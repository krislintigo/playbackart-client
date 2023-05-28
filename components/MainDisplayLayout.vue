<template lang="pug">
el-collapse(v-model='activeItems')
  div(v-for='block in statuses', :key='block.value')
    StatusCollapseTable(
      :title='block.title.toUpperCase()',
      :status='block.value'
    )
</template>

<script setup lang="ts">
type Sort = {
  prop: 'name' | 'rating' | 'time' | null
  order: 'ascending' | 'descending' | null
}

const props = defineProps<{
  items: Array<Item>
  editable: boolean
}>()

const emit = defineEmits<{
  (e: 'update-item', item: Item): void
  (e: 'delete-item', id: number): void
}>()

const activeItems = ref([0, 1, 2, 3, 4])

// const lookingItemsData = reactive({
//   pagination: {
//     page: 1,
//     pageSize: 50,
//   },
//   sort: {
//     prop: 'name',
//     order: null,
//   } as Sort,
// })
// const lookingItems = computed<Item[]>(() =>
//   props.items
//     .filter((item) => item.status === 'in-process')
//     .sort(sortBy(lookingItemsData.sort))
// )
// const plannedItemsData = reactive({
//   pagination: {
//     page: 1,
//     pageSize: 50,
//   },
//   sort: {
//     prop: 'name',
//     order: null,
//   } as Sort,
// })
// const plannedItems = computed<Item[]>(() =>
//   props.items
//     .filter((item) => item.status === 'planned')
//     .sort(sortBy(plannedItemsData.sort))
// )
// const viewedItemsData = reactive({
//   pagination: {
//     page: 1,
//     pageSize: 50,
//   },
//   sort: {
//     prop: 'name',
//     order: null,
//   } as Sort,
// })
// const viewedItems = computed<Item[]>(() =>
//   props.items
//     .filter((item) => item.status === 'completed')
//     .sort(sortBy(viewedItemsData.sort))
// )
// const postponedItemsData = reactive({
//   pagination: {
//     page: 1,
//     pageSize: 50,
//   },
//   sort: {
//     prop: 'name',
//     order: null,
//   } as Sort,
// })
// const postponedItems = computed<Item[]>(() =>
//   props.items
//     .filter((item) => item.status === 'postponed')
//     .sort(sortBy(postponedItemsData.sort))
// )
// const abandonedItemsData = reactive({
//   pagination: {
//     page: 1,
//     pageSize: 50,
//   },
//   sort: {
//     prop: 'name',
//     order: null,
//   } as Sort,
// })
// const abandonedItems = computed<Item[]>(() =>
//   props.items
//     .filter((item) => item.status === 'abandoned')
//     .sort(sortBy(abandonedItemsData.sort))
// )
//
// const displayedItems = computed(() => [
//   {
//     title: 'В ПРОЦЕССЕ',
//     paginated: lookingItems.value.slice(
//       (lookingItemsData.pagination.page - 1) *
//         lookingItemsData.pagination.pageSize,
//       lookingItemsData.pagination.page * lookingItemsData.pagination.pageSize
//     ),
//     total: lookingItems.value,
//     data: lookingItemsData,
//   },
//   {
//     title: 'ЗАПЛАНИРОВАНО',
//     paginated: plannedItems.value.slice(
//       (plannedItemsData.pagination.page - 1) *
//         plannedItemsData.pagination.pageSize,
//       plannedItemsData.pagination.page * plannedItemsData.pagination.pageSize
//     ),
//     total: plannedItems.value,
//     data: plannedItemsData,
//   },
//   {
//     title: 'ЗАВЕРШЕНО',
//     paginated: viewedItems.value.slice(
//       (viewedItemsData.pagination.page - 1) *
//         viewedItemsData.pagination.pageSize,
//       viewedItemsData.pagination.page * viewedItemsData.pagination.pageSize
//     ),
//     total: viewedItems.value,
//     data: viewedItemsData,
//   },
//   {
//     title: 'ОТЛОЖЕНО',
//     paginated: postponedItems.value.slice(
//       (postponedItemsData.pagination.page - 1) *
//         postponedItemsData.pagination.pageSize,
//       postponedItemsData.pagination.page *
//         postponedItemsData.pagination.pageSize
//     ),
//     total: postponedItems.value,
//     data: postponedItemsData,
//   },
//   {
//     title: 'БРОШЕНО',
//     paginated: abandonedItems.value.slice(
//       (abandonedItemsData.pagination.page - 1) *
//         abandonedItemsData.pagination.pageSize,
//       abandonedItemsData.pagination.page *
//         abandonedItemsData.pagination.pageSize
//     ),
//     total: abandonedItems.value,
//     data: abandonedItemsData,
//   },
// ])
</script>

<style scoped></style>
<style>
.block-header .el-collapse-item__header {
  background-color: var(--el-color-info-light-8);
  padding: 0 20px;
  border-left: 5px solid;
  border-bottom: 0;
  /* var(--el-text-color-primary) */
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
