<template lang="pug">
el-collapse-item.status-table(
  v-if='items.length',
  :name='index',
  :class='[status]'
)
  template(#title)
    h2.font-bold.text-lg {{ title }}
  el-table(v-loading='isPending', :data='items', @sort-change='onSortChange')
    el-table-column(type='index', label='#', width='57', :index='indexHandler')
    el-table-column(
      sortable='custom',
      prop='name',
      label='Название',
      min-width='350'
    )
      template(#default='scope')
        el-popover(
          placement='right',
          :width='420',
          trigger='hover',
          :show-after='300',
          :persistent='false'
        )
          template(#reference)
            el-link {{ scope.row.name }}
          ItemPreview(:item='scope.row')
    el-table-column(
      sortable='custom',
      prop='rating',
      label='Рейтинг',
      width='120'
    )
      template(#default='scope')
        el-popover(
          v-if='authStore.isAuthenticated && !route.query.userId',
          placement='right',
          :width='380',
          trigger='hover',
          :show-after='300',
          :persistent='false'
        )
          template(#reference)
            el-row.cursor-pointer(class='w-1/2') {{ scope.row.rating || '-' }}
          el-rate(
            :model-value='scope.row.rating',
            :max='10',
            show-text,
            :texts='rating.texts',
            :colors='rating.colors',
            @change='updateItemRating(scope.row, $event)'
          )
        span.cursor-pointer(v-else) {{ scope.row.rating || '-' }}
    el-table-column(
      sortable='custom',
      prop='time',
      label='Длительность',
      width='170'
    )
      template(#default='scope')
        el-tooltip(
          placement='left',
          effect='light',
          :content='formatDuration(scope.row.time.count * scope.row.time.duration)'
        )
          span.cursor-pointer(v-if='!scope.row.time.duration') -
          .cursor-pointer(v-else)
            el-row(justify='space-between')
              div
                span(v-if='scope.row.time.count > 1') {{ scope.row.time.count }} x&nbsp;
                span {{ formatDuration(scope.row.time.duration) }}
              el-tag.ml-2(
                v-if='scope.row.time.replays',
                effect='plain',
                type='info'
              ) x{{ scope.row.time.replays }}
    el-table-column(
      v-if='authStore.isAuthenticated && !route.query.userId',
      label='Операции',
      width='100'
    )
      template(#default='scope')
        el-button(
          :icon='ElIconEditPen',
          type='warning',
          circle,
          size='small',
          text,
          @click='emit("update-item", scope.row._id)'
        )
        el-popconfirm(
          title='Вы действительно хотите удалить?',
          width='285',
          confirm-button-text='Да',
          cancel-button-text='Нет',
          @confirm='emit("delete-item", scope.row._id)'
        )
          template(#reference)
            el-button(
              :icon='ElIconDelete',
              type='danger',
              circle,
              size='small',
              text
            )
  // find problem with total (hybrid)
  el-pagination.mt-3(
    v-model:current-page='currentPage',
    v-model:page-size='limit',
    :hide-on-single-page='limit === 20',
    layout='prev, pager, next, sizes',
    :page-sizes='[20, 50, 100]',
    :total='total'
  )
  el-row.gap-x-7.mt-3(align='middle')
    StatisticItem(title='Всего', :content='total')
    StatisticItem(
      title='Продолжительность',
      :content='(formatDuration(items.reduce((acc, cur) => acc + cur.time.count * cur.time.duration, 0)) || "-") + " / " + (formatDuration(items.reduce((acc, cur) => acc + (cur.time.replays + 1) * cur.time.count * cur.time.duration, 0)) || "-")',
      tooltip='Без повторов / Полная'
    )
    StatisticItem(
      v-if='pageCount > 1',
      title='Общая продолжительность',
      :content='(formatDuration(queryFilters.filters.total.find((i) => i.status === status)?.duration) || "-") + " / " + (formatDuration(queryFilters.filters.total.find((i) => i.status === status)?.fullDuration) || "-")',
      tooltip='Без повторов / Полная'
    )
</template>

<script setup lang="ts">
type Sort = {
  prop: 'name' | 'rating' | 'time'
  order: 1 | -1
}

const props = defineProps<{
  title: string
  status: Item['status']
  index: number
}>()

const emit = defineEmits(['update-item', 'delete-item'])

const { api } = useFeathers()
const route = useRoute()
const authStore = useAuthStore()
const queryFilters = useFilters()

const sort = reactive<Sort>({
  prop: 'name',
  order: 1,
})

const query = computed(() => ({
  query: {
    userId: route.query.userId || authStore.user?._id,
    ...(route.query.type && { type: route.query.type }),
    ...(queryFilters.searchQuery && {
      name: { $regex: queryFilters.searchQuery, $options: 'i' },
    }),
    ...(queryFilters.selectedRatings.length && {
      rating: { $in: queryFilters.selectedRatings },
    }),
    ...(queryFilters.selectedRestrictions.length && {
      restriction: { $in: queryFilters.selectedRestrictions },
    }),
    ...(queryFilters.selectedGenres.length && {
      genres: { $in: queryFilters.selectedGenres },
    }),
    ...(queryFilters.selectedDevelopers.length && {
      developers: { $in: queryFilters.selectedDevelopers },
    }),
    ...(queryFilters.selectedFranchises.length && {
      franchise: { $in: queryFilters.selectedFranchises },
    }),
    status: props.status,
    $sort: { [sort.prop]: sort.order },
    $limit: 20,
  },
}))

const {
  data: items,
  isPending,
  limit,
  currentPage,
  pageCount,
  total,
} = api.service('items').useFind(query, { paginateOn: 'hybrid' })

watch(limit, () => (currentPage.value = 1))

const indexHandler = (index: number) => {
  return (currentPage.value - 1) * limit.value + index + 1
}

const onSortChange = ({ prop, order }: Sort) => {
  const sortRef = { ascending: 1, descending: -1 }
  sort.prop = order ? prop : 'name'
  sort.order = sortRef[order] ?? 1
}

const updateItemRating = async (item: Item, rating: number) => {
  try {
    await item.save({ diff: { rating } })
    ElNotification.success({
      title: 'Рейтинг изменен',
      position: 'bottom-right',
    })
  } catch (error: any) {
    ElNotification.error({
      title: 'Что-то пошло не так...',
      position: 'bottom-right',
    })
  }
}
</script>

<style scoped></style>
<style lang="scss">
.status-table .el-collapse-item__header {
  background-color: var(--el-color-info-light-8);
  padding: 0 20px;
  border-left: 7px solid;
}

.status-table .el-table {
  --el-table-border-color: transparent;
  --el-table-header-bg-color: transparent;
}

.status-table .el-table .el-table__cell {
  padding: 4px 0;
}

.status-table .el-link__inner {
  word-break: normal;
}
</style>
