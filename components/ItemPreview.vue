<template lang="pug">
el-row.max-w-md
  el-col(:span='10')
    el-carousel(
      v-if='item.config.parts.multiplePosters',
      ref='carousel',
      indicator-position='none',
      arrow='never',
      :autoplay='false'
    )
      el-carousel-item(v-for='(_part, i) in item.parts', :key='i')
        LoadablePoster(:src='_part.poster.key', :size='170')
    template(v-else)
      LoadablePoster(:src='item.poster.key', :size='170')
    el-row.gap-x-2.mt-2(
      v-if='width < tableBreakpoints.operations',
      justify='center'
    )
      el-button(
        :icon='ElIconEditPen',
        type='warning',
        circle,
        @click='$emit("update-item", item._id)'
      )
      el-popconfirm(
        title='Вы действительно хотите удалить элемент?',
        width='250',
        confirm-button-text='Да',
        cancel-button-text='Нет',
        @confirm='$emit("delete-item", item._id)'
      )
        template(#reference)
          el-button(:icon='ElIconDelete', type='danger', circle)
  el-col(:span='13', :push='1')
    h2.mt-2.break-normal.text-left.font-medium.text-xl {{ item.name }}
    div(v-if='item.config.parts.extended')
      .w-4.h-4.rounded-full.mr-2.cursor-pointer.float-left(
        class='mt-[3px]',
        :style='{ background: statuses.find((s) => s.value === part.status).color }',
        @click='updateItemStatus(currentPartIndex, "")'
      )
      h3.text-base.break-normal.text-left.font-normal
        span.mr-1 {{ part.name }}
        span(v-if='part.year') ({{ part.year }})
    el-row.mt-2(v-if='item.config.parts.extended', align='middle')
      el-button(
        :icon='ElIconArrowLeft',
        circle,
        size='small',
        text,
        :disabled='currentPartIndex === 0',
        @click='currentPartIndex--'
      )
      p.mx-2 Сезоны
      el-button(
        :icon='ElIconArrowRight',
        circle,
        size='small',
        text,
        :disabled='currentPartIndex === item.parts.length - 1',
        @click='currentPartIndex++'
      )
    h4.mt-4.mb-2.font-normal Информация:
    .tags-container
      el-tag(type='info') {{ types.find((t) => t.value === item.type).title }}
      el-tag(
        v-if='item.config.parts.extended && item.parts.at(0).year && item.parts.at(-1).year',
        type='info'
      ) {{ item.parts.at(0).year + ' - ' + item.parts.at(-1).year }}
      el-tag(v-else-if='item.year', type='info') {{ item.year }}
      el-tag(v-if='item.restriction', type='info') {{ item.restriction }}
    template(v-if='item.genres.length')
      h4.mb-2.font-normal Жанры:
      .tags-container
        el-tag(v-for='(genre, i) in item.genres', :key='i', type='info') {{ PLAIN_GENRES.find((g) => g.value === genre).label }}
    template(v-if='item.categories.length')
      h4.mb-2.font-normal Категории:
      .tags-container
        el-tag(v-for='(category, i) in item.categories', :key='i', type='info') {{ category }}
    template(v-if='item.developers.length')
      h4.mb-2.font-normal Создатели:
      .tags-container
        el-tag(
          v-for='(developer, i) in item.developers',
          :key='i',
          type='info'
        ) {{ developer }}
    template(v-if='uniquePartsDevelopers(item).length')
      h4.mb-2.font-normal Создатели:
      .tags-container
        el-tag(
          v-for='(developer, i) in uniquePartsDevelopers(item)',
          :key='i',
          type='info',
          :hit='part.developers.includes(developer)'
        ) {{ developer }}
    template(v-if='authStore.isAuthenticated && !route.query.userId')
      SetStatusCollapseButton.hidden-xs-only(
        :current-status='item.status',
        @update='updateItemStatus(null, $event)'
      )
</template>

<script setup lang="ts">
import { PLAIN_GENRES } from '~/constants/genres'

const props = defineProps<{ item: Item }>()
defineEmits<{
  (e: 'update-item', itemId: string): void
  (e: 'delete-item', itemId: string): void
}>()

const route = useRoute()
const authStore = useAuthStore()
const { width } = useWindowSize()

const carousel = ref<any>(null)
const currentPartIndex = ref(0)

const part = computed(() => props.item.parts[currentPartIndex.value])

watch(currentPartIndex, () => {
  if (!props.item.config.parts.multiplePosters) return
  carousel.value.setActiveItem(currentPartIndex.value)
})

const updateItemStatus = async (
  partIndex: number | null,
  status: Item['status'],
) => {
  const _item = props.item.clone()
  if (partIndex !== null) {
    const currentStatusIndex = orderedMainStatuses.indexOf(
      _item.parts[partIndex].status,
    )
    _item.parts[partIndex].status =
      currentStatusIndex + 1 < orderedMainStatuses.length
        ? orderedMainStatuses.at(currentStatusIndex + 1)
        : orderedMainStatuses.at(0)
  } else {
    _item.status = status
  }
  await _item.save()
  _item.reset()
  ElMessage.success('Статус изменен')
}
</script>

<style scoped lang="scss">
.tags-container {
  @apply flex flex-wrap gap-x-2 gap-y-2 mb-5;
}
</style>
