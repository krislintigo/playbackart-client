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
  el-col(:span='13', :push='1')
    h2.mt-4.break-normal.text-left.font-medium.text-xl {{ item.name }}
    el-row(v-if='item.config.parts.extended', align='middle')
      .w-4.h-4.rounded-full.mr-2.cursor-pointer(
        :style='{ background: statuses.find((s) => s.value === part.status).color }',
        @click='updateItemStatus(currentPartIndex, "")'
      )
      h3.text-base.break-normal.font-normal
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
        el-tag(v-for='(genre, i) in item.genres', :key='i', type='info') {{ genre }}
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
el-row.hidden-sm-and-up(justify='center', class='max-w-[250px]')
  el-col(:span='24')
    SetStatusCollapseButton(
      :current-status='item.status',
      @update='updateItemStatus(null, $event)'
    )
</template>

<script setup lang="ts">
const props = defineProps<{ item: Item }>()

const route = useRoute()
const authStore = useAuthStore()

const carousel = ref<any>(null)
const currentPartIndex = ref(0)

const part = computed(() => props.item.parts[currentPartIndex.value])

watch(currentPartIndex, () => {
  if (!props.item.config.parts.multiplePosters) return
  carousel.value.setActiveItem(currentPartIndex.value)
})

const updateItemStatus = async (
  partIndex: number | string | null,
  status: string
) => {
  try {
    const _item = await props.item.clone()
    if (partIndex !== null) {
      const statusArray = statuses.map((st) => st.value)
      const currentStatusIndex = statusArray.indexOf(
        _item.parts[partIndex].status
      )
      _item.parts[partIndex].status =
        currentStatusIndex + 1 < statusArray.length
          ? statusArray.at(currentStatusIndex + 1)
          : statusArray.at(0)
    } else {
      _item.status = status
    }
    await _item.save()
    await _item.reset()
    ElMessage.success('Статус изменен')
  } catch (error: any) {
    ElMessage.error('Что-то пошло не так...')
  }
  // try {
  //   await props.item.save({ diff: { status } })
  //   ElMessage.success('Статус изменен')
  // } catch (error: any) {
  //   ElMessage.error('Что-то пошло не так...')
  // }
}
</script>

<style scoped lang="scss">
.tags-container {
  @apply flex flex-wrap gap-x-2 gap-y-2 mb-5;
}
</style>
