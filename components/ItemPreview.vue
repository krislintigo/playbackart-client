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
      el-carousel-item(v-for='(part, i) in item.parts', :key='i')
        LoadablePoster(
          :src='part.poster.key',
          :size='170',
          @error='onPosterError'
        )
    template(v-else)
      LoadablePoster(
        :src='item.poster.key',
        :size='170',
        @error='onPosterError'
      )
  el-col(:span='13', :push='1')
    h2.mt-4.break-normal.text-left.font-medium.text-xl {{ item.name }}
    h3.text-base.break-normal.font-normal(v-if='item.config.parts.extended')
      span.mr-1 {{ item.parts[currentPart].name }}
      span(v-if='item.parts[currentPart].year') ({{ item.parts[currentPart].year }})
    el-row.mt-2(v-if='item.config.parts.extended', align='middle')
      el-button(
        :icon='ElIconArrowLeft',
        circle,
        size='small',
        text,
        :disabled='currentPart === 0',
        @click='currentPart--'
      )
      p.mx-2 Сезоны
      el-button(
        :icon='ElIconArrowRight',
        circle,
        size='small',
        text,
        :disabled='currentPart === item.parts.length - 1',
        @click='currentPart++'
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
          :hit='item.parts[currentPart].developers.includes(developer)'
        ) {{ developer }}
    template(v-if='authStore.isAuthenticated && !route.query.userId')
      SetStatusCollapseButton.hidden-xs-only(
        :current-status='item.status',
        @update='updateItemStatus($event)'
      )
el-row.hidden-sm-and-up(justify='center', class='max-w-[250px]')
  el-col(:span='24')
    SetStatusCollapseButton(
      :current-status='item.status',
      @update='updateItemStatus($event)'
    )
</template>

<script setup lang="ts">
const props = defineProps<{ item: Item }>()

const route = useRoute()
const authStore = useAuthStore()

const carousel = ref<any>(null)
const currentPart = ref(0)

watch(currentPart, () => {
  if (!props.item.config.parts.multiplePosters) return
  carousel.value.setActiveItem(currentPart.value)
})

const onPosterError = () => {
  ElMessage.warning('Кажется, ссылка на фото элемента недействительна...')
}

const updateItemStatus = async (status: string) => {
  try {
    await props.item.save({ diff: { status } })
    ElMessage.success('Статус изменен')
  } catch (error: any) {
    ElMessage.error('Что-то пошло не так...')
  }
}
</script>

<style scoped lang="scss">
.tags-container {
  @apply flex flex-wrap gap-x-2 gap-y-2 mb-5;
}
</style>
