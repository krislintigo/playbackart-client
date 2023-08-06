<template lang="pug">
el-collapse-item.status-table(
  v-if='items.length',
  :name='index',
  :class='[status]'
)
  template(#title)
    h2.font-bold.text-lg {{ title }}
  el-table(v-loading='isPending', :data='items', @sort-change='onSortChange')
    el-table-column(v-if='width < tableBreakpoints.item', type='expand')
      template(#default='{ row: item }')
        el-card(body-style='padding: 10px')
          ItemPreview(:item='item')
    el-table-column(type='index', label='#', width='57', :index='indexHandler')
    el-table-column(
      sortable='custom',
      prop='name',
      label='Название',
      min-width='200'
    )
      template(#default='{ row: item }')
        el-popover(
          v-if='width > tableBreakpoints.item',
          placement='right',
          :width='420',
          trigger='hover',
          :show-after='300',
          :persistent='false'
        )
          template(#reference)
            el-link {{ item.name }}
          ItemPreview(:item='item')
    el-table-column(
      v-if='width > tableBreakpoints.rating',
      sortable='custom',
      prop='rating',
      label='Рейтинг',
      width='120'
    )
      template(#default='{ row: item }')
        el-popover(
          v-if='authStore.isAuthenticated && !route.query.userId',
          placement='right',
          :width='400',
          trigger='hover',
          :show-after='300',
          :persistent='false'
        )
          template(#reference)
            .cursor-pointer(v-if='item.config.parts.multipleRatings') {{ averagePartsRating(item) || '-' }}
            .cursor-pointer(v-else, class='w-1/2') {{ item.rating || '-' }}
          el-row(v-if='item.config.parts.multipleRatings')
            div(v-for='(part, i) in item.parts', :key='i')
              h3.text-base.font-bold {{ part.name }}:
              RatingInput(
                :model-value='part.rating',
                @change='updateItemRating(item, i, $event)'
              )
          RatingInput(
            v-else,
            :model-value='item.rating',
            @change='updateItemRating(item, null, $event)'
          )
        .cursor-pointer(v-else)
          el-tooltip(
            v-if='item.rating || averagePartsRating(item)',
            placement='right',
            effect='light'
          )
            template(#content)
              div(v-if='item.config.parts.multipleRatings')
                el-row(
                  v-for='(part, i) in item.parts',
                  :key='i',
                  justify='space-between'
                )
                  .text-sm
                    h3.text-base.font-bold
                      span.mr-1 {{ part.name + ': ' + (part.rating || '-') }}
                      span(v-if='part.rating') ({{ rating.texts[part.rating - 1] }})
              .text-sm(v-else) {{ rating.texts[item.rating - 1] }}
            div(v-if='item.config.parts.multipleRatings') {{ averagePartsRating(item) }}
            div(v-else, class='w-1/2') {{ item.rating || '-' }}
          span(v-else) -
    el-table-column(
      v-if='width > tableBreakpoints.time',
      sortable='custom',
      prop='time',
      label='Длительность',
      width='170'
    )
      template(#default='{ row: item }')
        el-tooltip(placement='left', effect='light')
          template(#content)
            div(v-if='item.config.parts.extended')
              el-row(
                v-for='(part, i) in item.parts',
                :key='i',
                justify='space-between',
                align='bottom'
              )
                .text-sm
                  h3.text-base.font-bold {{ part.name + ': ' }}
                  template(v-if='part.time.duration')
                    span(v-if='part.time.count > 1') {{ part.time.count }} x&nbsp;
                    span {{ formatDuration(part.time.duration) }}
                    span ( {{ formatDuration(part.time.count * part.time.duration) }} )
                  span(v-else) -
                el-tag.ml-2(
                  v-if='part.time.replays',
                  effect='plain',
                  type='info'
                ) x{{ part.time.replays }}
              el-divider(class='!my-2')
              h3.text-base.font-bold Итого: {{ formatDuration(computeDuration(item, false)) }}
            .text-sm(v-else) {{ formatDuration(item.time.count * item.time.duration) || '-' }}
          .cursor-pointer(v-if='item.config.parts.extended')
            el-row(justify='space-between')
              div(v-if='averagePartsDuration(item)')
                span {{ totalPartsCount(item) }} x&nbsp;
                span {{ formatDuration(averagePartsDuration(item)) }}
              span(v-else) -
              el-tag.ml-2(
                v-if='averagePartsReplays(item)',
                effect='plain',
                type='info'
              ) x{{ averagePartsReplays(item) }}
          span.cursor-pointer(v-else-if='!item.time.duration') -
          .cursor-pointer(v-else)
            el-row(justify='space-between')
              div
                span(v-if='item.time.count > 1') {{ item.time.count }} x&nbsp;
                span {{ formatDuration(item.time.duration) }}
              el-tag.ml-2(
                v-if='item.time.replays',
                effect='plain',
                type='info'
              ) x{{ item.time.replays }}
    el-table-column(
      v-if='authStore.isAuthenticated && width > 600',
      label='Операции',
      width='100'
    )
      template(#default='{ row: item }')
        template(v-if='!route.query.userId')
          el-button.ml-1(
            :icon='ElIconEditPen',
            type='warning',
            circle,
            size='small',
            text,
            @click='emit("update-item", item._id)'
          )
          el-popconfirm(
            title='Вы действительно хотите удалить элемент?',
            width='250',
            confirm-button-text='Да',
            cancel-button-text='Нет',
            @confirm='emit("delete-item", item._id)'
          )
            template(#reference)
              el-button(
                :icon='ElIconDelete',
                type='danger',
                circle,
                size='small',
                text
              )
        el-popconfirm(
          v-if='route.query.userId',
          title='Перенести элемент к себе?',
          width='250',
          confirm-button-text='Да',
          cancel-button-text='Нет',
          @confirm='transferItem(item)'
        )
          template(#reference)
            el-button.ml-5(
              :icon='ElIconSwitch',
              type='success',
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
      :content='(formatDuration(items.reduce((acc, cur) => acc + computeDuration(cur, false), 0)) || "-") + " / " + (formatDuration(items.reduce((acc, cur) => acc + computeDuration(cur, true), 0)) || "-")',
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
const { width } = useWindowSize()
const authStore = useAuthStore()
const queryFilters = useFilters()

const sortSelected = reactive<Sort>({
  prop: 'name',
  order: 1,
})

const sort = computed(() =>
  sortSelected.prop === 'name'
    ? { name: sortSelected.order }
    : { [sortSelected.prop]: sortSelected.order, name: 1 }
)

const query = computed(() => ({
  query: {
    userId: route.query.userId || authStore.user?._id,
    ...(route.query.type && { type: route.query.type }),
    ...(queryFilters.searchQuery && {
      $or: [
        { name: { $regex: queryFilters.searchQuery, $options: 'i' } },
        { 'parts.name': { $regex: queryFilters.searchQuery, $options: 'i' } },
      ],
    }),
    ...(queryFilters.selectedRatings.length && {
      $or: [
        { rating: { $in: queryFilters.selectedRatings } },
        { 'parts.rating': { $in: queryFilters.selectedRatings } },
      ],
    }),
    ...(queryFilters.selectedRestrictions.length && {
      restriction: { $in: queryFilters.selectedRestrictions },
    }),
    ...(queryFilters.selectedGenres.length && {
      genres: { $in: queryFilters.selectedGenres },
    }),
    ...(queryFilters.selectedDevelopers.length && {
      $or: [
        { developers: { $in: queryFilters.selectedDevelopers } },
        { 'parts.developers': { $in: queryFilters.selectedDevelopers } },
      ],
    }),
    ...(queryFilters.selectedFranchises.length && {
      franchise: { $in: queryFilters.selectedFranchises },
    }),
    status: props.status,
    $sort: sort.value,
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
} = api.service('items').useFind(query, { paginateOn: 'server' })

watch(limit, () => (currentPage.value = 1))

const indexHandler = (index: number) =>
  (currentPage.value - 1) * limit.value + index + 1

const onSortChange = ({ prop, order }: Sort) => {
  const sortRef = { ascending: 1, descending: -1 }
  sortSelected.prop = order ? prop : 'name'
  sortSelected.order = sortRef[order] ?? 1
}

const updateItemRating = async (
  item: Item,
  partIndex: number | string | null,
  rating: number
) => {
  try {
    const _item = await item.clone()
    if (partIndex !== null) {
      _item.parts[partIndex].rating = rating
    } else {
      _item.rating = rating
    }
    await _item.save()
    await _item.reset()
    ElMessage.success('Рейтинг изменен')
  } catch (error: any) {
    ElMessage.error('Что-то пошло не так...')
  }
}

const transferItem = async (item: Item) => {
  try {
    const newItem = api.service('items').new({
      ...item,
      _id: undefined,
      userId: authStore.user._id,
      status: 'postponed',
      rating: 0,
      poster: {
        ...item.poster,
        action: 'copy',
      },
      parts: item.parts.map((i) => ({
        ...i,
        rating: 0,
        poster: { ...i.poster, action: 'copy' },
      })),
    })
    await newItem.save()
    ElMessage.success('Элемент перенесен!')
  } catch (error: any) {
    ElMessage.error('Что-то пошло не так...')
  }
}
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.status-table > div > .el-collapse-item__header {
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
