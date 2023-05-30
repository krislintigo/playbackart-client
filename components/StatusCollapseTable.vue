<template lang="pug">
el-collapse-item.block-header(v-if='items.length', :name='index')
  template(#title)
    el-row
      h2(style='font-size: 18px') {{ title }}
  el-table(v-loading='isPending', :data='items', @sort-change='onSortChange')
    el-table-column(type='index', label='#', width='50', :index='indexHandler')
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
            el-row(style='width: 50%') {{ scope.row.rating || '-' }}
          el-rate(
            :model-value='scope.row.rating',
            :max='10',
            show-text,
            :texts='rating.texts',
            :colors='rating.colors',
            @change='updateItemRating(scope.row, $event)'
          )
        span(v-else) {{ scope.row.rating || '-' }}
    el-table-column(
      sortable='custom',
      prop='time',
      label='Длительность',
      width='170'
    )
      template(#default='scope')
        span(v-if='!scope.row.time.duration') -
        div(v-else)
          span(v-if='scope.row.time.count > 1') {{ scope.row.time.count }} x&nbsp;
          span {{ formatDuration(scope.row.time.duration) }}
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
          @click='emit("update-item", scope.row)'
        )
        el-popconfirm(
          title='Вы действительно хотите удалить?',
          width='200',
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
  el-pagination(
    v-model:current-page='currentPage',
    v-model:page-size='limit',
    hide-on-single-page,
    layout='prev, pager, next',
    :page-sizes='[20, 50, 100]',
    :total='total'
  )
  h4(style='margin: 5px 0') Продолжительность: {{ formatDuration(items.reduce((acc, cur) => acc + cur.time.count * cur.time.duration, 0)) || '-' }}
</template>

<script setup lang="ts">
type Sort = {
  prop: 'name' | 'rating' | 'time' | null
  order: 1 | -1 | null
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
  prop: null,
  order: null,
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
    $limit: 20,
    ...(sort.prop &&
      sort.order && {
        $sort: { [sort.prop]: sort.order },
      }),
  },
}))

const {
  data: items,
  isPending,
  limit,
  currentPage,
  total,
} = api.service('items').useFind(query, { paginateOn: 'hybrid' })

const indexHandler = (index: number) => {
  return (currentPage.value - 1) * limit.value + index + 1
}

const onSortChange = ({ prop, order }: Sort) => {
  const sortRef = { ascending: 1, descending: -1 }
  sort.prop = prop
  sort.order = sortRef[order] ?? null
}

const updateItemRating = async (item: Instance<Item>, rating: number) => {
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